// Grammar.js
import { FiniteAutomaton } from "./FiniteAutomaton.js";

export class Grammar {
  constructor() {
    // Terminals include 'd' as well, because of A → dD
    this.terminals = ["a", "b", "d"];
    // Non-terminals
    this.non_terminals = ["S", "A", "C", "D"];
    // Right-linear rules in "X-..." form
    // Each rule "X-yZ" means X → yZ in the usual grammar notation
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
   * Generates a random string by recursively expanding non-terminals.
   * WARNING: Because of D → aD, strings can get very long. 
   * In practice, you might want to cap the recursion depth.
   */
  generate_string() {
    const expand = (symbol) => {
      // If it's a terminal, just return it
      if (this.terminals.includes(symbol)) {
        return symbol;
      }

      // Otherwise, find the rules for this non-terminal
      const productions = this.rules
        .filter((rule) => rule.startsWith(symbol + "-")) // e.g. "S-..."
        .map((rule) => rule.split("-")[1]);              // right side strings

      // If no production found, stop expansion
      if (productions.length === 0) {
        return "";
      }

      // Randomly pick one production
      const chosen = productions[Math.floor(Math.random() * productions.length)];

      // Example: chosen = "aA" => split into ["a", "A"], expand each recursively
      return chosen
        .split("")
        .map((s) => expand(s))
        .join("");
    };

    // Start from S
    return expand(this.start);
  }

  /**
   * Converts the grammar to a (very simplistic) finite automaton.
   * This is your colleague’s “transitions” approach:
   *  - If X → y (1 terminal), then from state X on y go to "end".
   *  - If X → yZ (terminal + nonterminal), from X on y go to Z.
   * 
   * NOTE: This lumps all final transitions into a single "end" state.
   */
  to_finite_automaton() {
    const alphabet = [...this.terminals];
    // They treat states as the grammar's non-terminals plus one extra "end" state
    const states = [...this.non_terminals, "end"];
    const start_state = this.start;
    const accept_state = "end";

    const transitions = [];

    this.rules.forEach((rule) => {
      const [leftSide, rightSide] = rule.split("-");
      // If the right side is exactly 1 character and it's terminal => transition to end
      if (rightSide.length === 1 && this.terminals.includes(rightSide)) {
        transitions.push({
          src: leftSide,    // from non-terminal (e.g. C)
          char: rightSide,  // e.g. 'a'
          dest: accept_state
        });
      } 
      // If the right side is > 1 (e.g. 2 chars like "aA"), then from leftSide on firstChar => secondChar
      else if (rightSide.length >= 2) {
        const [t, n] = [rightSide[0], rightSide[1]];
        transitions.push({
          src: leftSide, // e.g. 'S'
          char: t,       // e.g. 'a'
          dest: n        // e.g. 'A'
        });
      }
      // If there's any other pattern, it's ignored or not used in this simplistic approach
    });

    return new FiniteAutomaton(
      states,
      alphabet,
      transitions,
      start_state,
      accept_state
    );
  }

  /**
   * A simplistic “classification” check that tries to see if this grammar 
   * is Type 3 (right-regular), Type 2, Type 1, or Type 0.
   * 
   * It's a rough check based on the shape of productions.
   * 
   * (Your colleague’s code checks if each rule is “terminal + optional single non-terminal”. 
   *  If so, calls it Type 3.)
   */
  classify() {
    let isType3 = true; // assume Regular
    let isType2 = true; // assume Context-Free
    let isType1 = true; // assume Context-Sensitive

    this.rules.forEach((rule) => {
      const [leftSide, rightSide] = rule.split("-");
      const symbols = rightSide.split("");
      const terminalSymbols = symbols.filter((sym) => this.terminals.includes(sym));
      const nonTerminalSymbols = symbols.filter((sym) => this.non_terminals.includes(sym));

      // Check Type 3 condition: (exactly 1 terminal + optional 1 nonterminal) or empty?
      // We don't have ε-rules here, so ignore that. 
      // This code is not a perfect definition, but we'll keep the colleague's logic.
      if (!(terminalSymbols.length <= 1 && nonTerminalSymbols.length <= 1 && symbols.length <= 2)) {
        isType3 = false;
      }

      // Check Type 2 condition: each rule has a single non-terminal on LHS
      if (leftSide.length !== 1 || !this.non_terminals.includes(leftSide)) {
        isType2 = false;
      }

      // Check Type 1 condition: right side length >= left side length (and no other constraints)
      // (For context-sensitive, each production must not shrink the string except possibly S->ε if allowed.)
      // Here we do a naive check:
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
