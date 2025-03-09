# Lexer & Scanner

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

### 3.1 Overview

The core of this project is the `Lexer.js` file, which exports a `Lexer` class. This class reads the input string and splits it into tokens using several helper methods. The recognized tokens and their categories are defined in `Token.js`.

### 3.2 Token Definition

We have a simple `Token` class and three dictionaries: one for keywords, one for operators (including multi-character operators like `==`, `>=`, etc.), and one for separators:

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

### 3.3 Lexer Class

The `Lexer` holds and advances through the input string. Key properties and methods include:

- `this.input`: The source code string.
- `this.index`: Current reading position in the string.
- **Helper Methods**:
  - `isAlpha(char)`: Checks if `char` is alphabetic or `_`.
  - `isDigit(char)`: Checks if `char` is a digit.
  - `isAlphanumeric(char)`: Combination of the above checks.

#### Reading Tokens

1. **`nextToken()`**  
   - Skips whitespace.  
   - Ignores single-line comments (`// ...`).  
   - Distinguishes between **numbers** (including floats), **identifiers/keywords**, and **operators/separators**.  
   - Returns one `Token` instance.  

2. **`readNumber()`**  
   - Gathers consecutive digits and optionally one decimal point to support floats.  
   - Produces either an `INTEGER` or a `FLOAT` token.

3. **`readIdentifierOrKeyword()`**  
   - Gathers letters/digits/underscore, checks if the resulting string matches a known keyword.  
   - Otherwise, returns an `IDENTIFIER`.

4. **`tokenize()`**  
   - Continuously calls `nextToken()` until `EOF` is reached, storing all tokens in an array.  

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
// (Snippet from index.js)
import Lexer from "./Lexer.js";

const input = `
// This is a comment
let x = 3.14
if (x >= 3) {
  x = x + 1
}
`;

const lexer = new Lexer(input);
const tokens = lexer.tokenize();
console.log(tokens);
```

### Sample Output

You might see tokens like:

```
[
  Token { type: 'LET', value: 'let' },
  Token { type: 'IDENTIFIER', value: 'x' },
  Token { type: 'ASSIGN', value: '=' },
  Token { type: 'FLOAT', value: '3.14' },
  Token { type: 'IF', value: 'if' },
  Token { type: 'L_PAREN', value: '(' },
  Token { type: 'IDENTIFIER', value: 'x' },
  Token { type: 'GREATER_EQUAL', value: '>=' },
  Token { type: 'INTEGER', value: '3' },
  Token { type: 'R_PAREN', value: ')' },
  Token { type: 'L_CURLY', value: '{' },
  Token { type: 'IDENTIFIER', value: 'x' },
  Token { type: 'ASSIGN', value: '=' },
  Token { type: 'IDENTIFIER', value: 'x' },
  Token { type: 'PLUS', value: '+' },
  Token { type: 'INTEGER', value: '1' },
  Token { type: 'R_CURLY', value: '}' },
  Token { type: 'FUNCTION', value: 'function' },
  Token { type: 'IDENTIFIER', value: 'x' },
  Token { type: 'ASSIGN', value: '=' },
  Token { type: 'IDENTIFIER', value: 'x' },
  Token { type: 'PLUS', value: '+' },
  Token { type: 'INTEGER', value: '1' },
  Token { type: 'R_CURLY', value: '}' },
  Token { type: 'FUNCTION', value: 'function' },
  Token { type: 'IDENTIFIER', value: 'x' },
  Token { type: 'PLUS', value: '+' },
  Token { type: 'INTEGER', value: '1' },
  Token { type: 'R_CURLY', value: '}' },
  Token { type: 'FUNCTION', value: 'function' },
  Token { type: 'INTEGER', value: '1' },
  Token { type: 'R_CURLY', value: '}' },
  Token { type: 'FUNCTION', value: 'function' },
  Token { type: 'R_CURLY', value: '}' },
  Token { type: 'FUNCTION', value: 'function' },
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
