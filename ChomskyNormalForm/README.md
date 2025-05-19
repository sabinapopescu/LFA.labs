# CNF Grammar Converter

### Course: Formal Languages & Finite Automata  
### Author: Popescu Sabina  

---

## 1. Theoretical Considerations

In formal language theory, context-free grammars (CFGs) are used to describe the syntax of programming languages and other structured formats. A **Context-Free Grammar (CFG)** consists of a set of production rules that describe all possible strings in a given formal language.

To simplify parsing and analysis, CFGs are often converted into **Chomsky Normal Form (CNF)**, where all production rules are of one of the following forms:

- `A → BC` (where A, B, and C are non-terminal symbols)
- `A → a` (where A is a non-terminal and a is a terminal symbol)
- `S → ε` (only if ε is in the language)

### Why CNF?

CNF is particularly useful in theoretical computer science, including:

- Parsing algorithms (e.g., CYK parser)
- Proving language properties
- Automating transformations and simplifications

The conversion to CNF involves multiple steps including:
- Eliminating ε-productions
- Eliminating unit productions
- Removing inaccessible and non-productive symbols
- Rewriting productions to fit CNF structure

---

## 2. Objectives

The lab aimed to implement a program that:

- Converts a given CFG into Chomsky Normal Form (CNF)
- Cleans the grammar of non-productive and unreachable rules
- Displays the CNF grammar in a readable format

---

## 3. Implementation Strategy

The implementation is done in JavaScript using a class-based approach to structure the grammar logic. The core class used is:

```js
class Grammar { ... }
```

This class encapsulates all transformation logic. Below are the main responsibilities of this class and its key methods:

### 3.1 Class Constructor

```js
constructor(nonTerminals, terminals, productions, startSymbol)
```

Initializes the grammar using sets for terminals/non-terminals and a dictionary for production rules.

### 3.2 Eliminate Epsilon Productions

```js
eliminateEpsilonProductions()
```

Identifies all nullable variables and regenerates rules excluding these variables using combinations. The inner function `_generateNullableCombinations()` handles all valid subsets of symbols excluding nullables.

### 3.3 Eliminate Unit Productions

```js
eliminateUnitProductions()
```

Removes rules of the form `A → B`, replacing them with the rules that B produces directly.

```js
_unitClosure(symbol)
```

A helper function to recursively find all symbols reachable via unit productions from a given non-terminal.

### 3.4 Remove Inaccessible and Non-Productive Symbols

```js
eliminateInaccessibleSymbols()
```

Traverses reachable symbols from the start symbol and deletes unreachable ones.

```js
eliminateNonProductiveSymbols()
```

Keeps only symbols that eventually lead to terminal strings.

### 3.5 Convert to Chomsky Normal Form

```js
toChomskyNormalForm()
```

This method handles two key transformations:
- Replacing terminals in long rules with dedicated terminal variables.
- Breaking long productions (more than 2 symbols) into a chain of binary productions.

It uses a helper method:

```js
getNewVariable(prefix)
```

Generates unique non-terminal names for new variables introduced during transformation.

### 3.6 Displaying the Grammar

```js
printGrammar()
```

Prints the final grammar in a readable CNF format.

---

## 4. Code Snippet Overview

Below is a snapshot of how the class is used:

```js
const grammar = new Grammar(
    ["S", "A", "B", "C"],
    ["a", "d"],
    {
        S: [["d", "B"], ["A"]],
        A: [["d"], ["d", "S"], ["a", "B", "d", "A", "B"]],
        B: [["a"], ["d", "A"], ["A"], []],
        C: [["A", "a"]],
    },
    "S"
);

// Apply transformation steps
grammar.eliminateEpsilonProductions();
grammar.eliminateUnitProductions();
grammar.eliminateInaccessibleSymbols();
grammar.eliminateNonProductiveSymbols();
grammar.toChomskyNormalForm();
grammar.printGrammar();
```

Each method is applied sequentially to transform the grammar into CNF.

---

## 5. Final Output

Once the code is run, the CNF grammar is printed clearly with productions separated and grouped by non-terminal:

```
A → d | T0 S | X4 B | X3 A | X6 B | X5 A
B → a | T0 A | d | T0 S | X4 B | X3 A | X6 B | X5 A
S → T0 B | d | T0 S | X4 B | X3 A | X6 B | X5 A
T0 → d
T1 → a
X2 → T1 B
X3 → X2 T0
X4 → X3 A
X5 → T1 T0
X6 → X5 A
```

This output is now easier to read and directly usable in further theoretical analysis or parsing tasks.

---

## 6. Conclusion

The transformation of a context-free grammar (CFG) into Chomsky Normal Form (CNF) is a critical process in formal language theory, enabling the use of efficient parsing algorithms such as CYK. This lab offered a practical and programmatic exploration of that transformation pipeline. Each stage—whether it was the elimination of ε-productions, unit productions, or inaccessible and non-productive symbols—was grounded in theoretical principles and translated into methodical, readable code. The implementation was carefully structured through an object-oriented approach, encapsulating all transformation logic within a single class. Helper methods like _generateNullableCombinations and _unitClosure were pivotal in handling complex transformations with clarity and precision.

By the end of the lab, the grammar was successfully converted to CNF, verified by structured output that adhered strictly to CNF's syntactic rules. More than just a transformation exercise, this lab reinforced the theoretical foundations of grammar normalization while highlighting the value of clean, modular programming in handling abstract computational models.

---

## 7. References

1. [Chomsky Normal Form – Wikipedia](https://en.wikipedia.org/wiki/Chomsky_normal_form)
2. [CFG Simplification Guide](https://cs.stackexchange.com/questions/121529/how-do-i-convert-a-context-free-grammar-to-chomsky-normal-form)
3. Course materials and professor instructions
