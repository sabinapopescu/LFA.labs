# Regex String Generator

### Course: Formal Languages & Finite Automata  
### Author: Popescu Sabina  

---

## 1. Theoretical Considerations

Regular expressions (regex) are formal languages used to describe patterns in strings. They form the foundation of **lexical analysis**, a key step in compiling where input text is transformed into meaningful tokens.

In the context of automata theory, regular expressions define **regular languages**, which are the simplest class of languages and are recognizable by **finite automata**. The correspondence between regular expressions and deterministic finite automata (DFA) forms a theoretical basis for many text processing tools.

### Core Constructs in Regex

| Construct   | Meaning                              |
|-------------|---------------------------------------|
| `a`         | Literal character                     |
| `a*`        | Zero or more repetitions              |
| `a+`        | One or more repetitions               |
| `a|b`       | Alternation (either `a` or `b`)       |
| `(ab)`      | Grouping (sequence of sub-patterns)   |
| `a²` / `a³` | Exact repetition (2 or 3 times)       |

These elements, when parsed and interpreted, allow the generation or recognition of complex string patterns efficiently.

---

## 2. Objectives

- Interpret complex regex expressions dynamically, not hardcoded.
- Generate valid strings based on these regexes, including those with repetition and alternation.
- Limit repetition for operators like `*` and `+` to 5 occurrences.
- Log the internal processing of the regex in human-readable form.

---

## 3. Implementation Strategy

The implementation is written in **JavaScript** and consists of the following parts:

### 3.1 Regex Parser and Generator

The main logic involves parsing a regex-like string character by character and interpreting its structure. Key cases handled:

- **Groups (`(A|B)`):** Alternatives are split and a random option is selected.
- **Repeaters (`*`, `+`):** The preceding character is repeated a random number of times (0–5 for `*`, 1–5 for `+`).
- **Superscripts (`²`, `³`):** The preceding character is repeated exactly 2 or 3 times.
- **Literal Concatenation:** Any character not part of a pattern operator is directly appended.

Example logic (pseudocode):
```js
If char is '(', read until ')', split by '|', pick one randomly.
If char is '*', repeat previous char 0–5 times.
If char is '+', repeat previous char 1–5 times.
If char is superscript (² or ³), repeat previous char exactly.
Otherwise, append character directly.
