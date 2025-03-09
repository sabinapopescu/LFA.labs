export class FiniteAutomaton {
    constructor() {
      // Adapted to Variant 24
      this.states = ["q0", "q1", "q2"];
      this.alphabet = ["a", "b"];
  
      // Non-deterministic transitions
      // q0 --b--> q0
      // q0 --b--> q1
      // q1 --b--> q2
      // q0 --a--> q0
      // q1 --a--> q1
      // q2 --a--> q2
      this.transitions = [
        { src: "q0", char: "b", dest: "q0" },
        { src: "q0", char: "b", dest: "q1" },
        { src: "q1", char: "b", dest: "q2" },
        { src: "q0", char: "a", dest: "q0" },
        { src: "q1", char: "a", dest: "q1" },
        { src: "q2", char: "a", dest: "q2" },
      ];
  
      this.start_state = "q0";
      this.accept_state = "q2";
    }
  
    /**
     * Convert the FA to a simple “regular grammar” format.
     * (Just storing as an object, not necessarily in proper normal form.)
     */
    to_regular_grammar() {
      let grammar = {
        terminals: [],
        non_terminals: [],
        rules: [],
        start: "",
      };
  
      this.alphabet.forEach((char) => {
        grammar.terminals.push(char);
      });
  
      this.states.forEach((state) => {
        grammar.non_terminals.push(state);
      });
  
      this.transitions.forEach(({ src, char, dest }) => {
        // e.g. "q0-a->q0"
        grammar.rules.push(`${src}-${char}->${dest}`);
      });
  
      grammar.start = this.start_state;
  
      return grammar;
    }
  
    /**
     * Check if the automaton is deterministic:
     *   - For each (state, symbol) pair, there must be *at most* one destination.
     */
    is_deterministic() {
      const transitionMap = {};
  
      for (let { src, char, dest } of this.transitions) {
        if (!transitionMap[src]) {
          transitionMap[src] = {};
        }
        if (!transitionMap[src][char]) {
          transitionMap[src][char] = new Set();
        }
  
        // Add the destination for this (state, symbol)
        transitionMap[src][char].add(dest);
  
        // If more than one possible dest for (src, char), => non-deterministic
        if (transitionMap[src][char].size > 1) {
          return false;
        }
      }
      return true;
    }
  
    /**
     * Convert an NDFA to a DFA using subset/powerset construction.
     */
    to_dfa() {
      const dfa = {
        states: [],          // will hold array of "combined" states like "q0,q1"
        alphabet: [...this.alphabet],
        transitions: [],
        start_state: [this.start_state], // subset containing just q0
        accept_states: [],
      };
  
      // For labeling each subset with a unique string
      const stateMap = {};
      const queue = [[...dfa.start_state].sort()]; // initialize BFS queue
  
      // Create a key for the start subset "q0"
      stateMap[queue[0].join(",")] = queue[0].join(",");
  
      while (queue.length > 0) {
        // current subset of NDFA states
        const currentSubset = queue.shift();
        const currentStateId = currentSubset.join(",");
  
        // Add the subset as a state in the new DFA if not present
        if (!dfa.states.includes(currentStateId)) {
          dfa.states.push(currentStateId);
        }
  
        // If any member of the subset is an old accept state => new subset is accept
        if (
          currentSubset.some((st) => this.accept_state === st) &&
          !dfa.accept_states.includes(currentStateId)
        ) {
          dfa.accept_states.push(currentStateId);
        }
  
        // For each symbol, find the union of all NDFA transitions from currentSubset
        this.alphabet.forEach((char) => {
          const nextSubset = new Set();
  
          currentSubset.forEach((s) => {
            // find transitions from state s on input char
            this.transitions.forEach((transition) => {
              if (transition.src === s && transition.char === char) {
                nextSubset.add(transition.dest);
              }
            });
          });
  
          // Turn that set of states into a sorted array => stable ID
          const nextSubsetArray = Array.from(nextSubset).sort();
          const nextStateId = nextSubsetArray.join(",");
  
          // If there is at least one NDFA state in nextSubset
          if (nextSubset.size > 0) {
            // If we haven't seen this subset before, add it
            if (!stateMap[nextStateId]) {
              stateMap[nextStateId] = nextStateId;
              queue.push(nextSubsetArray);
            }
  
            // Add a transition in the new DFA
            dfa.transitions.push({
              src: currentStateId,
              char: char,
              dest: nextStateId,
            });
          }
        });
      }
  
      return dfa;
    }
  }
  