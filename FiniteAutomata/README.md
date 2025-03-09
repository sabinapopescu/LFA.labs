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

- \(Q = \{q0, q1, q2\}\)
- \(\Sigma = \{a, b\}\)
- Start state: \(q0\)
- Final state(s): \( \{q2\} \)
- Transitions:
  - \(\delta(q0, b) = q0\)
  - \(\delta(q0, b) = q1\)
  - \(\delta(q1, b) = q2\)
  - \(\delta(q0, a) = q0\)
  - \(\delta(q1, a) = q1\)
  - \(\delta(q2, a) = q2\)

### 3.2. Example Usage

```js
// index.js (snippet)
import { FiniteAutomaton } from "./FiniteAutomaton.js";

const fa = new FiniteAutomaton();

console.log("=== Regular Grammar ===");
console.log(fa.to_regular_grammar());

console.log("\n=== Is FA Deterministic? ===");
console.log(fa.is_deterministic());

console.log("\n=== Converted to DFA ===");
console.log(fa.to_dfa());
```

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
