// Token.js

// Basic Token class to store type and value.
export class Token {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
  }
  
  // A small set of keywords (expand if needed).
  export const KEYWORDS = {
    if: "IF",
    else: "ELSE",
    function: "FUNCTION",
    return: "RETURN",
    let: "LET",
    true: "TRUE",
    false: "FALSE",
  };
  
  // Operators: single- and multi-character.
  export const OPERATORS = {
    // Single-char
    "+": "PLUS",
    "-": "MINUS",
    "*": "MULT",
    "/": "DIV",
    "%": "MOD",
    "<": "LESS",
    ">": "GREATER",
    "=": "ASSIGN",
  
    // Multi-char
    "==": "EQUAL",
    "!=": "NOT_EQUAL",
    ">=": "GREATER_EQUAL",
    "<=": "LESS_EQUAL",
  };
  
  // Common separators (parentheses, braces, etc.).
  export const SEPARATORS = {
    "(": "L_PAREN",
    ")": "R_PAREN",
    "{": "L_CURLY",
    "}": "R_CURLY",
    "[": "L_SQUARE",
    "]": "R_SQUARE",
    ";": "SEMICOLON",
    ",": "COMMA",
  };
  