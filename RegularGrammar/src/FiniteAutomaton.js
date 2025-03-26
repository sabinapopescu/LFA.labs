// FiniteAutomaton.js
export class FiniteAutomaton {
  constructor(states, alphabet, transitions, start_state, accept_state) {
    this.states = states;
    this.alphabet = alphabet;
    this.transitions = transitions; // e.g., [{ src, char, dest }, ...]
    this.start_state = start_state;
    this.accept_state = accept_state;
  }

  /**
   * NFA-style acceptance check
   */
  accept(inputString) {
    let currentStates = new Set([this.start_state]);

    for (let i = 0; i < inputString.length; i++) {
      const symbol = inputString[i];
      let nextStates = new Set();

      currentStates.forEach((st) => {
        // All possible transitions on this symbol
        const validTransitions = this.find_transitions(st, symbol);
        validTransitions.forEach((t) => {
          nextStates.add(t.dest);
        });
      });

      // If no valid next states, reject
      if (nextStates.size === 0) {
        return false;
      }
      currentStates = nextStates;
    }

    // Accept if we ended in "end"
    return currentStates.has(this.accept_state);
  }

  find_transitions(state, symbol) {
    return this.transitions.filter(
      (t) => t.src === state && t.char === symbol
    );
  }
}
