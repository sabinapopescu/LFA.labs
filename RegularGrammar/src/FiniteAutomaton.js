

export class FiniteAutomaton {
    constructor(states, alphabet, transitions, startState, acceptStates) {
      this.states = states;                 // array of states
      this.alphabet = alphabet;             // array of valid symbols
      this.transitions = transitions;       // array of { src, char, dest }
      this.startState = startState;         // single start state
      // acceptStates can be a single state or multiple; handle both
      this.acceptStates = Array.isArray(acceptStates) ? acceptStates : [acceptStates];
    }
  
    // Checks if inputString is accepted by the FA
    accept(inputString) {
      // We keep track of the set of current states (supports epsilon or NFA-like transitions)
      let currentStates = new Set([this.startState]);
  
      for (const char of inputString) {
        // Next states after consuming 'char'
        let nextStates = new Set();
  
        // For each possible current state, see which transitions are available
        for (const state of currentStates) {
          const validTransitions = this.findTransitions(state, char);
          for (const t of validTransitions) {
            nextStates.add(t.dest);
          }
        }
  
        // If we have no next states, the string is immediately rejected
        if (nextStates.size === 0) {
          return false;
        }
  
        // Update currentStates
        currentStates = nextStates;
      }
  
      // If after consuming the entire string, at least one currentState is accepting, accept the string
      for (const state of currentStates) {
        if (this.acceptStates.includes(state)) {
          return true;
        }
      }
  
      // Otherwise, reject
      return false;
    }
  
    // Helper: find all transitions from currentState on inputSymbol
    findTransitions(currentState, inputSymbol) {
      return this.transitions.filter(
        (t) => t.src === currentState && t.char === inputSymbol
      );
    }
  }
  