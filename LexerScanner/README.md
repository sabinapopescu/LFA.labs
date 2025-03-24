# Lexer 

### Course: Formal Languages & Finite Automata

### Author: Popescu Sabina

## 1. Theory

**Lexical analysis** is the process of converting a raw input string (source code) into a sequence of *tokens*—atomic pieces of syntax such as keywords, identifiers, literals, and operators. The *lexer* (or *scanner*) reads characters from the source code, groups them into meaningful pieces (tokens), and classifies these tokens by type. This simplifies the job of the next compilation stage—the parser—which can then deal with tokens rather than individual characters.

### Key Steps in Lexical Analysis

- **Input Buffering**: Efficiently reading source code in chunks.  
- **Pattern Matching**: Uses character classification (digit, letter, etc.) or regular expressions and a finite state machine to match tokens.  
- **Token Generation**: Produces tokens, each with a type (e.g., `IF`, `IDENTIFIER`, `FLOAT`) and value (the actual text or number).  
- **Error Handling**: The lexer must detect and handle illegal character sequences, reporting or skipping them as needed.  
- **Integration with Parser**: Lexers often provide tokens on demand to parsers in a *compiler* or *interpreter* pipeline.

## 2. Objectives

- Understand the role of lexical analysis in a compiler.
- Implement a basic JavaScript lexer that recognizes keywords, identifiers, operators, numbers (including floats), and comments.
- Demonstrate how to tokenize a sample input.

## 3. Implementation Description

## 3. Implementation Description

### 3.1 Overview

The project is organized around a `Lexer` class, whose purpose is to process an input string and generate tokens. The tokens, along with their respective categories, are defined separately. The overall design emphasizes modularity, allowing for clear separation between helper methods and core tokenization functions.

### 3.2 Token Definitions

The token definitions are managed by a `Token` class and several dictionaries:
- **Token:** Encapsulates a token's type and its literal value.
- **KEYWORDS:** A dictionary that maps reserved words (e.g., `if`, `else`, `function`) to their token types, ensuring that they are not mistaken for identifiers.
- **OPERATORS:** Lists both single-character and multi-character operators (e.g., `+`, `-`, `==`, `!=`), which are essential for expression evaluation.
- **SEPARATORS:** Contains symbo
```js
// (Snippet from Token.js)
export class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

// Examples of how we categorize certain keywords, operators, and separators:
export const KEYWORDS = {
  if: "IF",
  else: "ELSE",
  function: "FUNCTION",
  // ...
};

export const OPERATORS = {
  "+": "PLUS",
  "-": "MINUS",
  "==": "EQUAL",
  "!=": "NOT_EQUAL",
  // ...
};

export const SEPARATORS = {
  "(": "L_PAREN",
  ")": "R_PAREN",
  // ...
};
```


### 3.3 Functions of the Lexer Class

Below is an explanation of the key functions within the `Lexer` class, focusing on their purpose and implementation approach:

- **Constructor:**  
  Initializes the lexer with the raw input string. It also sets the initial reading index and combines dictionaries for operators and separators. The symbols are sorted by length (in descending order) to ensure that multi-character symbols (like "==") are prioritized over single-character ones (like "=").

- **isAlpha:**  
  Checks whether a given character is an alphabet letter or an underscore. This function is crucial for identifying the beginning of an identifier or keyword.

- **isDigit:**  
  Determines if a character is a digit (0–9). This function is fundamental for parsing numerical values.

- **isAlphanumeric:**  
  Combines the functionality of `isAlpha` and `isDigit` to check if a character is a letter, digit, or underscore. This is used to build complete identifiers.

- **nextToken:**  
  The core method that reads the input from the current index and returns the next recognized token. It:
  - Skips whitespace.
  - Ignores single-line comments.
  - Checks if the next token is a number, an identifier/keyword, or an operator/separator.
  - Returns an `EOF` token if the end of input is reached.
  
  This method is essential for orchestrating the overall tokenization process.

- **readNumber:**  
  Processes a sequence of digits, allowing for at most one decimal point, to produce either an `INTEGER` or a `FLOAT` token. This function ensures numerical values are correctly parsed, which is critical for arithmetic operations.

- **readIdentifierOrKeyword:**  
  Reads characters to form an identifier, then checks if the identifier matches any reserved keywords. If a match is found, a corresponding keyword token is returned; otherwise, an `IDENTIFIER` token is produced. This distinction is vital to differentiate user-defined names from language keywords.

- **tokenize:**  
  Repeatedly calls `nextToken` to process the entire input string until an `EOF` token is encountered. It collects all tokens into an array, providing a complete token stream for the parser. This method encapsulates the end-to-end tokenization process.

---


Below is a short snippet showing how `nextToken()` starts:

```js
// (Snippet from Lexer.js)
nextToken() {
  // Skip whitespace
  while (
    this.index < this.input.length &&
    /\s/.test(this.input[this.index])
  ) {
    this.index++;
  }

  // Check for end of input
  if (this.index >= this.input.length) {
    return new Token("EOF", null);
  }

  // Handle single-line comments
  if (this.input.startsWith("//", this.index)) {
    while (
      this.index < this.input.length &&
      this.input[this.index] !== "
"
    ) {
      this.index++;
    }
    return this.nextToken();
  }

  // ... subsequent checks for numbers, keywords, or symbols ...
}
```

## 4. Usage Example

In the `index.js` file, we instantiate the `Lexer` with some test input and print out the resulting tokens:

```js
const input = `

function doSomething() {

  if (x != 5) {
    x = 10
  }
}
`;
```

### Sample Output

You might see tokens like:

```
[
  Token { type: 'FUNCTION', value: 'function' },
  Token { type: 'IDENTIFIER', value: 'doSomething' },
  Token { type: 'L_PAREN', value: '(' },
  Token { type: 'R_PAREN', value: ')' },
  Token { type: 'L_CURLY', value: '{' },
  Token { type: 'IF', value: 'if' },
  Token { type: 'L_PAREN', value: '(' },
  Token { type: 'IDENTIFIER', value: 'x' },
  Token { type: 'NOT_EQUAL', value: '!=' },
  Token { type: 'INTEGER', value: '5' },
  Token { type: 'R_PAREN', value: ')' },
  Token { type: 'L_CURLY', value: '{' },
  Token { type: 'IDENTIFIER', value: 'x' },
  Token { type: 'ASSIGN', value: '=' },
  Token { type: 'INTEGER', value: '10' },
  Token { type: 'R_CURLY', value: '}' },
  Token { type: 'R_CURLY', value: '}' },
  Token { type: 'EOF', value: null }
]
```
![image](https://github.com/user-attachments/assets/4addb268-c2e3-41f4-9617-7b0de009b4c8)


## 5. Conclusion

With this simple lexer, we have demonstrated:
- How to classify and read tokens from a string.
- How to handle comments, floats, and multi-character operators.
- The flexibility of JavaScript regular expressions for quick checks like digits or letters.

Further enhancements could include:
- **Multi-line comments** (`/* */`).
- **String literals** with escape characters.
- **Error recovery** instead of immediate throws.

## 6. References

1. [Introduction to Lexical Analysis](https://en.wikipedia.org/wiki/Lexical_analysis)
2. [Theory of Formal Languages & Finite Automata](https://en.wikipedia.org/wiki/Formal_language)
3. Class materials and lab instructions.
