# Determinism in Finite Automata. Conversion from NDFA to DFA. Chomsky Hierarchy

### Course: Formal Languages & Finite Automata  
### Author: Popescu Sabina

---

## 1. Theory

### 1.1. Chomsky Hierarchy

The **Chomsky hierarchy** is a fundamental framework in the field of theoretical computer science
and linguistics, introduced by Noam Chomsky in 1956. It classifies formal grammars into four
distinct levels according to their generative power, essentially categorizing different types of
languages and automata (computational models) that recognize these languages.

- At the bottom of the hierarchy is **Type 3**, or **regular grammars**, which are recognized by finite
  automata and correspond to regular languages. These are the simplest and least powerful
  grammars.
- Moving up, **Type 2** consists of **context-free grammars**, recognized by pushdown automata, which
  generate context-free languages often used in the analysis of programming languages.
- **Type 1** or **context-sensitive grammars** are more complex and are recognized by linear-bounded
  automata; they generate context-sensitive languages that can describe some natural language
  constructs not possible with Type 2.
- At the top of the hierarchy is **Type 0**, which includes **recursively enumerable grammars** recognized
  by Turing machines. This level is the most powerful, capable of expressing any computation that can
  be performed by a computer.

### 1.2. NFAs and DFAs

**Non-deterministic Finite Automata (NFAs)** and **Deterministic Finite Automata (DFAs)** are key concepts
in automata theory, used for recognizing patterns and regular languages. The main distinction lies in their
state transitions:

- DFAs have exactly one transition per state and input symbol, ensuring a single computational path.
- NFAs can transition to multiple states for the same input, allowing for various paths simultaneously,
  including ε-transitions that require no input.

Despite these operational differences, both NFAs and DFAs are equally powerful in terms of language
recognition, although NFAs can often represent languages more succinctly.

**NFA: Non-deterministic Finite Automata**
- **Multiple Transitions**: Can transition to several states from a single input, including
  without consuming an input (ε-transitions).
- **Parallel Paths**: Capable of exploring multiple paths or states simultaneously.
- **Conversion to DFA**: Possible but may lead to an exponential increase in states.

**DFA: Deterministic Finite Automata**
- **Single Transition**: One transition per state and input symbol, leading to predictability.
- **Simplicity in Analysis**: Easier to analyze and implement due to deterministic nature.
- **State Efficiency**: Potentially more states required than an equivalent NFA for some
  languages.

---

## 2. Objectives

1. **Understand what an automaton is and what it can be used for.**

2. **Continuing the work** in the same repository and the same project, the following need to be added:
   - Provide a function in your grammar type/class that could classify the grammar
     based on **Chomsky hierarchy**.
   - For this you can use the variant from the previous lab.

3. According to **Variant 24** (by universal convention it is register ID), get the
   finite automaton definition and do the following tasks:
   - Implement conversion of a finite automaton to a **regular grammar**.
   - Determine whether your FA is **deterministic** or **non-deterministic**.
   - Implement some functionality that would convert an **NDFA** to a **DFA**.
   - Represent the finite automaton **graphically** (Optional, and can be considered as a
     bonus point).

     You can use external libraries, tools or APIs to generate the figures/diagrams.  
     Your program needs to gather and send the data about the automaton, and the lib/tool/API
     returns the visual representation.

---

## 3. Implementation

### 3.1. Finite Automaton Definition for Variant 24

**Finite Automaton (NDFA) Definition**:

- **States:** `Q = {q0, q1, q2}`
- **Alphabet:** `Σ = {a, b}`
- **Start state:** `q0`
- **Final state(s):** `{q2}`
- **Transition Functions:**

| State | Input | Next States |
|--------|------|------------|
| `q0` | `b` | `q0`, `q1` |
| `q1` | `b` | `q2` |
| `q0` | `a` | `q0` |
| `q1` | `a` | `q1` |
| `q2` | `a` | `q2` |

---

### 3.2. Code Implementation

#### **Finite Automaton Class**

```js
export class FiniteAutomaton {
    constructor() {
        // States and alphabet of the NDFA (Variant 24)
        this.states = ["q0", "q1", "q2"];
        this.alphabet = ["a", "b"];
        
        // Defining the transition function (NDFA can have multiple transitions for the same input)
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
}
```
> **Explanation:** This constructor defines an **NDFA** with **multiple transitions** for a single input. The `transitions` array contains objects mapping a source state, an input character, and a destination state.

#### **Converting NDFA to Regular Grammar**

```js
to_regular_grammar() {
    let grammar = {
        terminals: [],
        non_terminals: [],
        rules: [],
        start: "",
    };

    this.alphabet.forEach((char) => grammar.terminals.push(char));
    this.states.forEach((state) => grammar.non_terminals.push(state));

    this.transitions.forEach(({ src, char, dest }) => {
        grammar.rules.push(`${src}-${char}->${dest}`);
    });

    grammar.start = this.start_state;
    return grammar;
}
```
> **Explanation:** This method converts the automaton transitions into a **regular grammar format**.  
> Example output: `q0-b->q1`, `q1-a->q1`, etc.

#### **Checking If the Automaton is Deterministic**

```js
is_deterministic() {
    const transitionMap = {};

    for (let { src, char, dest } of this.transitions) {
        if (!transitionMap[src]) {
            transitionMap[src] = {};
        }
        if (!transitionMap[src][char]) {
            transitionMap[src][char] = new Set();
        }

        transitionMap[src][char].add(dest);

        // If a state has more than one transition for the same symbol, it's non-deterministic
        if (transitionMap[src][char].size > 1) {
            return false;
        }
    }
    return true;
}
```
> **Explanation:**  
> - Stores transitions in a dictionary and checks if any state has multiple transitions for a single input.  
> - **Returns `false` if NDFA detected** (i.e., multiple transitions for `q0` on `b`).

---

## 4. Results

After running the code:

- **Regular Grammar**: Displays transitions in a rule format, e.g. `q0-b->q0`, `q0-b->q1`, etc.
- **Determinism Check**: The FA is **non-deterministic** due to multiple transitions for `(q0, b)`.
- **DFA Construction**: The `to_dfa()` method merges states into subsets, forming a deterministic version.

---
![Screenshot 2025-03-09 174022](https://github.com/user-attachments/assets/bb79d6d6-30c6-49a5-9013-7edfeae1f67a)

## 5. Conclusions

This project explored **Chomsky hierarchy** and **finite automata**. The key takeaways include:

- **Regular Grammar Classification** (Type 3)  
- **NDFA to DFA conversion using subset construction**  
- **Comparison of determinism and non-determinism**  
- **The importance of DFAs in practical applications**  

This lab enhanced my understanding of **automata theory** and its real-world significance.
