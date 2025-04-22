
export const TokenType = {
    INTEGER: "INTEGER",
    IDENTIFIER: "IDENTIFIER",
    KEYWORD: "KEYWORD",
    OPERATOR: "OPERATOR",
    SEPARATOR: "SEPARATOR",
    EOF: "EOF",
  };
  
  export const KEYWORDS = {
    if: TokenType.KEYWORD,
    else: TokenType.KEYWORD,
    function: TokenType.KEYWORD,
    return: TokenType.KEYWORD,
    let: TokenType.KEYWORD,
    true: TokenType.KEYWORD,
    false: TokenType.KEYWORD,
    for: TokenType.KEYWORD,
  };
  
  export const OPERATORS = {
    "+": TokenType.OPERATOR,
    "-": TokenType.OPERATOR,
    "*": TokenType.OPERATOR,
    "/": TokenType.OPERATOR,
    "%": TokenType.OPERATOR,
    "<": TokenType.OPERATOR,
    ">": TokenType.OPERATOR,
    "==": TokenType.OPERATOR,
    "=": TokenType.OPERATOR,
  };
  
  export const SEPARATORS = {
    "(": TokenType.SEPARATOR,
    ")": TokenType.SEPARATOR,
    "{": TokenType.SEPARATOR,
    "}": TokenType.SEPARATOR,
    "[": TokenType.SEPARATOR,
    "]": TokenType.SEPARATOR,
    ";": TokenType.SEPARATOR,
    ",": TokenType.SEPARATOR,
  };
  
  export class Token {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
  }
  