// Lexer.js
import { Token, KEYWORDS, OPERATORS, SEPARATORS } from "./Token.js";

export default class Lexer {
  constructor(input) {
    // The raw input string we want to tokenize.
    this.input = input;
    this.index = 0;

    // Create a combined map of symbols (operators + separators)
    // Then sort them by length descending so multi-char operators match first.
    this.allSymbols = Object.assign({}, OPERATORS, SEPARATORS);
    this.sortedSymbols = Object.keys(this.allSymbols).sort(
      (a, b) => b.length - a.length
    );
  }

  /* --- Helper Methods --- */

  isAlpha(char) {
    return /[a-zA-Z_]/.test(char);
  }

  isDigit(char) {
    return /\d/.test(char);
  }

  isAlphanumeric(char) {
    return this.isAlpha(char) || this.isDigit(char);
  }

  /* --- Core Lexer Methods --- */

  /**
   * nextToken
   * Reads from the current index and returns the next recognized token.
   * If no more tokens are available, returns an EOF token.
   */
  nextToken() {
    // 1. Skip whitespace
    while (
      this.index < this.input.length &&
      /\s/.test(this.input[this.index])
    ) {
      this.index++;
    }

    // 2. Check end of input
    if (this.index >= this.input.length) {
      return new Token("EOF", null);
    }

    // 3. Handle single-line comments (e.g. // ...)
    if (this.input.startsWith("//", this.index)) {
      // Skip until newline
      while (
        this.index < this.input.length &&
        this.input[this.index] !== "\n"
      ) {
        this.index++;
      }
      // After skipping the comment, re-check the next token
      return this.nextToken();
    }

    // For convenience, the remainder of the string from the current index
    const remainder = this.input.slice(this.index);

    // 4. Number (integer or float)
    if (this.isDigit(this.input[this.index])) {
      return this.readNumber();
    }

    // 5. Identifier or Keyword
    if (this.isAlpha(this.input[this.index])) {
      return this.readIdentifierOrKeyword();
    }

    // 6. Operators or Separators (including multi-character)
    for (const symbol of this.sortedSymbols) {
      if (remainder.startsWith(symbol)) {
        this.index += symbol.length;
        const type = this.allSymbols[symbol];
        return new Token(type, symbol);
      }
    }

    // 7. Unknown character
    throw new Error(
      `Lexer Error: Unknown character '${this.input[this.index]}' at index ${this.index}`
    );
  }

  /**
   * readNumber
   * Reads a sequence of digits and at most one decimal point.
   * Produces either an INTEGER or a FLOAT token.
   */
  readNumber() {
    let numStr = "";
    let hasDecimal = false;

    while (this.index < this.input.length) {
      const c = this.input[this.index];

      if (this.isDigit(c)) {
        numStr += c;
        this.index++;
      } else if (c === "." && !hasDecimal) {
        hasDecimal = true;
        numStr += c;
        this.index++;
      } else {
        break;
      }
    }

    const tokenType = hasDecimal ? "FLOAT" : "INTEGER";
    return new Token(tokenType, numStr);
  }

  /**
   * readIdentifierOrKeyword
   * Reads letters/digits (identifier).
   * If the result matches a known keyword, we return that keyword token,
   * otherwise it's just an identifier token.
   */
  readIdentifierOrKeyword() {
    let ident = "";
    while (
      this.index < this.input.length &&
      this.isAlphanumeric(this.input[this.index])
    ) {
      ident += this.input[this.index];
      this.index++;
    }

    // Check if it matches a keyword
    if (Object.hasOwn(KEYWORDS, ident)) {
      return new Token(KEYWORDS[ident], ident);
    }

    // Otherwise, it's a normal identifier
    return new Token("IDENTIFIER", ident);
  }

  /**
   * tokenize
   * Repeatedly calls nextToken() until it receives an EOF token.
   * Returns the array of all tokens.
   */
  tokenize() {
    const tokens = [];
    let token = this.nextToken();

    while (token.type !== "EOF") {
      tokens.push(token);
      token = this.nextToken();
    }
    // Push the EOF token too, if you want it in the array
    tokens.push(token);

    return tokens;
  }
}
