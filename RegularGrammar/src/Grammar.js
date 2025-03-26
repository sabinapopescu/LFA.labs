// Grammar.js
import { FiniteAutomaton } from "./FiniteAutomaton.js";

export class Grammar {
  constructor() {
    // Terminals
    this.terminals = ["a", "b", "d"];
    // Non-terminals
    this.non_terminals = ["S", "A", "C", "D"];
    // Right-linear rules in "X-..." form
    this.rules = [
      "S-aA",  // S → aA
      "A-bS",  // A → bS
      "A-dD",  // A → dD
      "D-bC",  // D → bC
      "C-a",   // C → a
      "C-bA",  // C → bA
      "D-aD",  // D → aD
    ];
    // Start symbol
    this.start = "S";
  }

  /**
   * Repeatedly expand non-terminals (left to right) until:
   *   - No non-terminals remain (fully derived),
   *   - or we hit maxSteps to prevent infinite loops.
   *
   * Returns a string of terminals. If we exit due to maxSteps,
   * we might still have non-terminals. But often it completes fully.
   */
  generate_string(maxSteps = 30) {
    // We'll store the current "sentence" as an array of symbols (terminals or non-terminals)
    let derived = [this.start];

    for (let step = 0; step < maxSteps; step++) {
      // Find the first non-terminal in 'derived'
      const indexOfNT = derived.findIndex(sym => this.non_terminals.includes(sym));

      // If no non-terminals found => done, it's all terminals
      if (indexOfNT === -1) {
        break;
      }

      // Identify which non-terminal we found
      const ntSymbol = derived[indexOfNT];

      // All expansions that match ntSymbol → (rightSide)
      const possibleExpansions = this.rules
        .filter(r => r.startsWith(ntSymbol + "-"))
        .map(r => r.split("-")[1]); // e.g. "aA"

      // If no expansions exist, just stop
      if (possibleExpansions.length === 0) {
        break;
      }

      // Randomly choose one expansion
      const chosen = possibleExpansions[Math.floor(Math.random() * possibleExpansions.length)];

      // Replace the non-terminal with the symbols of 'chosen'
      derived.splice(indexOfNT, 1, ...chosen.split(""));
    }

    // Join everything into a string
    return derived.join("");
  }

  /**
   * Generate 'n' strings. Each is made by calling 'generate_string()'.
   */
  generate_n_strings(n = 5, maxSteps = 30) {
    const strings = [];
    for (let i = 0; i < n; i++) {
      strings.push(this.generate_string(maxSteps));
    }
    return strings;
  }

  /**
   * Converts this right-linear grammar into a simple finite automaton.
   */
  to_finite_automaton() {
    const alphabet = [...this.terminals];
    const states = [...this.non_terminals, "end"];
    const start_state = this.start;
    const accept_state = "end";

    const transitions = [];

    // Build transitions from each rule
    this.rules.forEach((rule) => {
      const [leftSide, rightSide] = rule.split("-");

      // If the right side is exactly one terminal => go to "end"
      if (rightSide.length === 1 && this.terminals.includes(rightSide)) {
        transitions.push({
          src: leftSide,
          char: rightSide,
          dest: accept_state
        });
      }
      // If the right side is two symbols: a terminal + a non-terminal
      else if (rightSide.length === 2) {
        const [t, n] = [rightSide[0], rightSide[1]];
        transitions.push({
          src: leftSide,
          char: t,
          dest: n
        });
      }
      // Otherwise, ignore (for the simplistic approach)
    });

    return new FiniteAutomaton(states, alphabet, transitions, start_state, accept_state);
  }

  /**
   * Quick check to classify grammar type: Type 3 > Type 2 > Type 1 > Type 0
   */
  classify() {
    let isType3 = true;
    let isType2 = true;
    let isType1 = true;

    this.rules.forEach((rule) => {
      const [leftSide, rightSide] = rule.split("-");
      const symbols = rightSide.split("");
      const terminalSymbols = symbols.filter(s => this.terminals.includes(s));
      const nonTerminalSymbols = symbols.filter(s => this.non_terminals.includes(s));

      // For Type 3:
      //   left side => single NT
      //   right side => at most 1 T + at most 1 NT (or just 1 T)
      if (!(terminalSymbols.length <= 1 && nonTerminalSymbols.length <= 1 && symbols.length <= 2)) {
        isType3 = false;
      }

      // For Type 2: left side must be exactly one non-terminal
      if (leftSide.length !== 1 || !this.non_terminals.includes(leftSide)) {
        isType2 = false;
      }

      // For Type 1: right side length >= left side length (simplistic check)
      if (rightSide.length < leftSide.length) {
        isType1 = false;
      }
    });

    if (isType3) {
      return "Regular Grammar (Type 3)";
    } else if (isType2) {
      return "Context-Free Grammar (Type 2)";
    } else if (isType1) {
      return "Context-Sensitive Grammar (Type 1)";
    } else {
      return "Recursively Enumerable Grammar (Type 0)";
    }
  }
}
