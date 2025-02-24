// RegularGrammar/src/Grammar.js
import { FiniteAutomaton } from "./FiniteAutomaton.js";

export class Grammar {
  constructor() {
    // (You can keep these hard-coded or pass them as constructor params if you prefer.)
    this.V_t = ["a", "b", "c", "d", "e", "f", "j"];  // terminals
    this.V_n = ["S", "L", "D"];                     // non-terminals
    this.P = [
      "S-aS", "S-bS", "S-cD", "S-dL", "S-e", 
      "L-eL", "L-fL", "L-jD", "L-e", 
      "D-eD", "D-d"
    ];                                               // productions
    this.S = "S";                                    // start symbol
  }

  // Recursively generate a random valid string from the grammar.
  generateString() {
    // Inner function that recursively expands a symbol
    const expand = (symbol) => {
      // If it's a terminal, just return it.
      if (this.V_t.includes(symbol)) {
        return symbol;
      }

      // Find all productions for the non-terminal `symbol`.
      const matchingProductions = this.P
        .filter((rule) => rule.startsWith(symbol + "-"))
        .map((rule) => rule.split("-")[1]); 
        // e.g. "S-aS" => right side is "aS"

      // Pick one production at random
      const chosenProduction = matchingProductions[
        Math.floor(Math.random() * matchingProductions.length)
      ];

      // Expand each character of the chosen production
      let result = "";
      for (const char of chosenProduction) {
        result += expand(char);
      }
      return result;
    };

    // Start expanding from the start symbol
    return expand(this.S);
  }

  // Convert Grammar to a Finite Automaton
  toFiniteAutomaton() {
    const alphabet = [...this.V_t];
    const states = [...this.V_n];
    // We'll add an "end" state for when we produce a single terminal and stop
    states.push("end");

    const startState = this.S;
    const acceptState = "end";

    // We'll store transitions as an array of objects { src, char, dest }
    const transitions = [];

    for (const production of this.P) {
      const [leftSide, rightSide] = production.split("-");
      // If rightSide is a single terminal, that leads us to the 'end' state
      if (rightSide.length === 1 && this.V_t.includes(rightSide)) {
        transitions.push({
          src: leftSide,
          char: rightSide,
          dest: acceptState
        });
      } 
      // If rightSide has multiple symbols, assume the first is a terminal & second is a non-terminal
      else if (rightSide.length > 1) {
        // e.g. "aS" => from state = leftSide, char = 'a', next state = 'S'
        // This only accounts for the first two symbols. The example is mimicking your Python approach.
        transitions.push({
          src: leftSide,
          char: rightSide[0],
          dest: rightSide[1]
        });
      }
      // If your grammar had more complex right sides, you'd need additional logic.
    }

    // Build and return a FiniteAutomaton object
    return new FiniteAutomaton(states, alphabet, transitions, startState, acceptState);
  }
}
