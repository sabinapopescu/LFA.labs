// FiniteAutomaton.js
export class FiniteAutomaton {
  constructor(states, alphabet, transitions, start_state, accept_state) {
    this.states = states;
    this.alphabet = alphabet;
    this.transitions = transitions; // e.g. [{src, char, dest}, ...]
    this.start_state = start_state;
    this.accept_state = accept_state;
  }

  /**
   * Check acceptance by following all possible transitions in a simple NFA sense.
   * (Though your colleague code lumps final states into "end" so it’s effectively
   *  a single final state.)
   */
  accept(inputString) {
    // We keep track of a set of current states (NFA approach).
    let currentStates = new Set([this.start_state]);

    for (let i = 0; i < inputString.length; i++) {
      const symbol = inputString[i];
      let nextStates = new Set();

      // For each currentState, see what transitions we have on `symbol`
      currentStates.forEach((st) => {
        const validTransitions = this.find_transitions(st, symbol);
        validTransitions.forEach((t) => {
          nextStates.add(t.dest);
        });
      });

      if (nextStates.size === 0) {
        // No possible transitions => reject
        return false;
      }
      // Move to the next set of states
      currentStates = nextStates;
    }

    // After consuming all symbols, check if at least one current state is "end"
    for (let st of currentStates) {
      // The colleague's code uses `.includes(st)`:
      // That means "end".includes(st) if st === "end" => true
      // But to be safer, do an exact check:
      if (st === this.accept_state) {
        return true;
      }
    }
    return false;
  }

  find_transitions(state, symbol) {
    return this.transitions.filter(
      (t) => t.src === state && t.char === symbol
    );
  }
}
