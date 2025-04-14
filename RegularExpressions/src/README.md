# Regex String Generator

### Course: Formal Languages & Finite Automata  
### Author: Popescu Sabina  

---

## 1. Theoretical Considerations

Regular expressions (regex) are a core tool in formal language theory, used to define search and pattern-matching rules over strings. In automata theory, they represent **regular languages**, which can be recognized by **finite automata** (deterministic or non-deterministic). 

Regex plays a vital role in **lexical analysis**, where source code or text is scanned and split into **tokens**. These tokens serve as building blocks for further stages in compilers or interpreters.

### Key Constructs Used in Regex

| Construct      | Meaning                                                         |
|----------------|------------------------------------------------------------------|
| `a`            | A literal character                                              |
| `a*`           | Zero or more occurrences of `a` (Kleene star)                    |
| `a+`           | One or more occurrences of `a`                                   |
| `a|b`          | Either `a` or `b` (alternation)                                  |
| `(ab)`         | Grouping of subpatterns                                          |
| `a²`, `a³`     | Exact repetitions of a character (2 or 3 times, respectively)    |

These constructs form the foundation of many real-world applications like search engines, syntax highlighters, and text editors.

---

## 2. Objectives

The main objectives of this lab were:

- To dynamically interpret complex regular expressions.
- To generate valid strings that match the patterns defined by these expressions.
- To handle operators like `*`, `+`, and superscripted values (`²`, `³`) correctly.
- To create a log of all internal operations and parsing steps, making the process traceable and educational.
- To limit potentially infinite quantifiers (`*`, `+`) to a safe range of up to 5 repetitions.

---

## 3. Implementation Strategy

The solution was implemented in JavaScript using procedural logic to mimic regex parsing behavior. The overall structure includes:

- **Random Selection Logic**: For alternation or repetition.
- **Parser Function**: That walks through the regex character-by-character.
- **Group Handling**: Nesting and alternation through recursion.
- **Logging**: Each meaningful parsing step is captured and displayed.

### 3.1 Parsing & Processing Logic

The parsing algorithm processes each character of the regex in sequence:

- When encountering `(`, it starts a group and looks ahead until the matching `)` is found. The content inside is split by `|`, and one option is randomly selected.
- If a character is followed by:
  - `*`: It is repeated 0 to 5 times.
  - `+`: It is repeated 1 to 5 times.
  - `²` or `³`: It is repeated exactly 2 or 3 times, respectively.
- Literal characters (e.g., `L`, `Q`, `2`) are appended directly to the result string.

#### Simplified Logic Example

```js
if (char === '(') {
  read and extract group content;
  split options by '|';
  randomly choose one;
}
else if (char === '*') {
  repeat previous character 0–5 times;
}
else if (char === '+') {
  repeat previous character 1–5 times;
}
else if (char is superscript) {
  repeat previous character exactly 2 or 3 times;
}
else {
  append literal character;
}
```

The core `parse()` function uses a loop and a switch-like structure to walk through each regex expression and build a valid result.

---

## 4. Regex Examples and Output

The following regular expressions were given in **Variant 4** of the lab assignment:

1. `(S|T)(U|V)w*y+24`
2. `L(M|N)0³p*Q(2|3)`
3. `R*S(T|U|V)W(X|Y|Z)²`

Each regex is parsed, evaluated, and translated into a valid string. Below are sample outputs from multiple runs:

### Sample Output

```
Regex 1: (S|T)(U|V)w*y+24
Generated String: TUwwwyyy24
Processing Steps:
 - Chose option "T" from group (S|T)
 - Chose option "U" from group (U|V)
 - Repeated "w" 3 times for "*"
 - Repeated "y" 3 times for "+"

Regex 2: L(M|N)0³p*Q(2|3)
Generated String: LN000ppQ2
Processing Steps:
 - Chose option "N" from group (M|N)
 - Repeated "0" exactly 3 times for superscript "³"
 - Repeated "p" 2 times for "*"
 - Chose option "2" from group (2|3)

Regex 3: R*S(T|U|V)W(X|Y|Z)²
Generated String: RRRSVWYY
Processing Steps:
 - Repeated "R" 3 times for "*"
 - Chose option "V" from group (T|U|V)
 - Chose option "Y" from group (X|Y|Z)
 - Repeated "Y" exactly 2 times for superscript "²"
```
![image](https://github.com/user-attachments/assets/fc628c94-1420-4a9c-8bc1-e8ff49d4ff29)

Each result is randomly generated but conforms strictly to the pattern described by its respective regex.

---

## 5. Logging & Debugging

A key educational feature of this project is the ability to log how the regex was processed. This helps users understand:

- What choices were made during parsing.
- How repetition values were selected.
- Which characters were appended directly.

This is particularly valuable when learning how pattern matching and automata transition systems work internally.

---

## 6. Conclusion

This project demonstrates how theoretical constructs from automata theory—specifically regular languages—can be applied to real-world problems through code. By building a system that parses and evaluates regular expressions to generate valid strings, the implementation required a concrete understanding of grouping, alternation, quantifiers, and deterministic decision paths. Writing the parser manually, rather than relying on built-in regex engines, clarified how finite automata would transition between states based on input, and how non-determinism can be handled programmatically using controlled randomness. Moreover, the structured logging of each parsing and generation step provided transparency into the system’s inner workings, making the behavior of regex expressions more predictable and explainable. Overall, the task reinforced not just the mechanics of regex but also their theoretical grounding in computation models.

---

## 7. Future Improvements

- Add support for nested groups and escaped characters.
- Implement regex to NFA visualization.
- Extend syntax to handle character classes (e.g., `[a-z]`) and optional elements (`?`).
- Create a web interface to visualize output generation interactively.

---

## 8. References

1. [Regex - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)  
2. [Formal Languages – Wikipedia](https://en.wikipedia.org/wiki/Formal_language)  
3. [Theory of Finite Automata](https://en.wikipedia.org/wiki/Deterministic_finite_automaton)  
4. Course slides, lab description, and discussions
