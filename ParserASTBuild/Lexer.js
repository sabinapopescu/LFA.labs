
import { TokenType, KEYWORDS, OPERATORS, SEPARATORS, Token } from "./TokenType.js";

export default class Lexer {
  constructor(input) {
    this.input = input;
    this.index = 0;
  }

  isAlpha(char) {
    return /[a-zA-Z_]/.test(char);
  }

  isDigit(char) {
    return /\d/.test(char);
  }

  isAlphanumeric(char) {
    return this.isAlpha(char) || this.isDigit(char);
  }

  nextToken() {
    while (this.index < this.input.length) {
      let currentChar = this.input[this.index];

      if (/\s/.test(currentChar)) {
        this.index++;
        continue;
      }

      if (this.isDigit(currentChar)) {
        let num = "";
        while (this.index < this.input.length && this.isDigit(this.input[this.index])) {
          num += this.input[this.index++];
        }
        return new Token(TokenType.INTEGER, num);
      }

      if (this.isAlpha(currentChar)) {
        let ident = "";
        while (this.index < this.input.length && this.isAlphanumeric(this.input[this.index])) {
          ident += this.input[this.index++];
        }
        return new Token(KEYWORDS[ident] || TokenType.IDENTIFIER, ident);
      }

      for (let value of Object.keys({ ...OPERATORS, ...SEPARATORS })) {
        if (this.input.substr(this.index, value.length) === value) {
          this.index += value.length;
          return new Token({ ...OPERATORS, ...SEPARATORS }[value], value);
        }
      }

      throw new Error(`Unknown token: ${currentChar}`);
    }

    return new Token(TokenType.EOF, "");
  }

  tokenize() {
    const tokens = [];
    let token;
    do {
      token = this.nextToken();
      tokens.push(token);
    } while (token.type !== TokenType.EOF);
    return tokens;
  }
}
