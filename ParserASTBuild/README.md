
# Parser and Abstract Syntax Tree (AST) Builder

### Course: Formal Languages & Finite Automata  
### Author: Popescu Sabina  
### Credits: Cretu Dumitru, with contributions from Vasile Drumea and Irina Cojuhari  

---

## 1. Theoretical Considerations

An **Abstract Syntax Tree (AST)** is a hierarchical data structure that represents the abstract syntactic structure of a program or code snippet. The AST is used in the compilation process and reflects the grammatical structure of source code written in a formal language. Each node in the tree represents a construct occurring in the text, such as a variable, an operator, or an expression. The AST is a higher-level representation of a **parse tree** where unnecessary syntactic details like parentheses are removed, and only the abstract structure remains. ASTs help in simplifying the analysis and transformation of source code in various stages of program compilation, such as optimization and code generation.

The term **parsing** refers to the process of analyzing a sequence of symbols (often source code or data) according to the rules of a formal grammar. In the context of programming languages, parsing identifies the grammatical structure of the source code, turning it into a parse tree or abstract syntax tree, which then provides the foundation for further analysis. Parsing algorithms are essential in building compilers and interpreters. These algorithms can be based on various parsing techniques such as **recursive descent parsing**, **LL parsing**, and **LR parsing**.

### 1.1 Parsing and Syntax Analysis

Parsing is crucial in determining how components in a string relate to one another based on the grammar. The process of syntactic analysis is vital for determining the meaning and structure of the input. It involves breaking down input data into its constituent parts—tokens—and analyzing how they fit together according to the grammatical rules of the language.

The parsing process can be broken down into:

- **Lexical Analysis**: Breaking the input into tokens, which represent atomic units of meaning.
- **Syntax Analysis**: Analyzing the structure of the sequence of tokens, often resulting in the creation of a parse tree or AST.
- **Semantic Analysis**: Adding meaning to the structures created during the parsing phase by attaching additional information.

### 1.2 Abstract Syntax Tree vs Parse Tree

The **parse tree** is a direct tree representation of the syntactic structure of the input based on the formal grammar. It is usually very detailed and contains a node for every token in the input string. In contrast, the **abstract syntax tree (AST)** is a more compact and abstract representation. The AST omits unnecessary syntactic details, such as parentheses and repeated operators, focusing only on the structural elements relevant for subsequent stages of the compilation process, such as code generation or optimization.

**Example**:
For an arithmetic expression like `a + (b * c)`, a parse tree would include nodes for the `+` operator and the parentheses. In contrast, the AST would simplify this to an addition node with two child nodes—`a` and a multiplication node (`b * c`).

## 2. Objectives

The key objectives of this project were:

- To implement a **lexer** that tokenizes an input string based on a formal grammar.
- To build a **parser** that analyzes the sequence of tokens and constructs an abstract syntax tree.
- To represent the abstract syntax tree (AST) using classes and nodes.
- To handle the following constructs in the language:
  - **Expressions** (including binary operators)
  - **Identifiers** (variables)
  - **Numbers** (constants)
  - **Parentheses** (grouping expressions)

By combining lexical analysis and syntactic analysis, this project simulates part of the compilation process, focusing on converting an input string into an AST.

---

## 2. Objectives

This lab aimed to:

- Implement a lexer to tokenize input using regular expressions.
- Define and categorize tokens using a `TokenType` enum-like object.
- Construct AST nodes for expressions involving numbers, variables, and binary operations.
- Develop a recursive descent parser to analyze the token stream and build the AST.
- Provide readable visual output of the AST.

---

## 3. Implementation Strategy

### 3.1 Tokenizer (Lexer)

The lexer uses regular expressions and a character-wise loop to scan the input and produce tokens. Token types include:

- `INTEGER`: numeric constants
- `IDENTIFIER`: variable names
- `OPERATOR`: arithmetic operators (`+`, `-`, `*`, `/`)
- `SEPARATOR`: parentheses and punctuation
- `KEYWORD`: reserved language terms like `if`, `let`, `return`, etc.

**Example:**

```js
new Token(TokenType.INTEGER, "56");
```

### 3.2 Abstract Syntax Tree (AST)

The AST is built using three classes:

- `NumberNode`: represents numeric literals
- `VariableNode`: represents identifiers
- `BinaryOperatorNode`: represents operations like `+`, `*`, etc.

These inherit from a base `ASTNode` class for consistency.

### 3.3 Parser

The parser implements a **recursive descent strategy**, handling precedence by splitting expression parsing into:

- `parseExpression()` → handles overall expressions
- `parseAddition()` → handles `+` and `-`
- `parseMultiplication()` → handles `*` and `/`
- `parsePrimary()` → handles literals, identifiers, and grouped expressions (with parentheses)

Example:

```js
12 + (variableName - 34) * 56 / variable_2
```

Will generate an AST with nested `BinaryOperatorNode` structures.

---

## 4. Sample Output

### Tokenized Input

```
Tokens:
[
  INTEGER(12),
  OPERATOR(+),
  SEPARATOR((),
  IDENTIFIER(variableName),
  OPERATOR(-),
  INTEGER(34),
  SEPARATOR()),
  OPERATOR(*),
  INTEGER(56),
  OPERATOR(/),
  IDENTIFIER(variable_2),
  EOF()
]
```

### AST Output (Raw)

```json
{
  "type": "BinaryOperator",
  "operator": "+",
  "left": { "type": "Number", "value": 12 },
  "right": {
    "type": "BinaryOperator",
    "operator": "/",
    "left": {
      "type": "BinaryOperator",
      "operator": "*",
      "left": {
        "type": "BinaryOperator",
        "operator": "-",
        "left": { "type": "Variable", "identifier": "variableName" },
        "right": { "type": "Number", "value": 34 }
      },
      "right": { "type": "Number", "value": 56 }
    },
    "right": { "type": "Variable", "identifier": "variable_2" }
  }
}
```

### Pretty Printed Tree View

```
+
  12
  /
    *
      -
        variableName
        34
      56
    variable_2
```

---

## 5. Program Output

<img width="403" alt="image" src="https://github.com/user-attachments/assets/d51e32f3-2395-443e-aeb2-32a0d51d63c4" />


---

## 6. Conclusion

This project demonstrated the process of converting an input string into an abstract syntax tree (AST) through a combination of lexical analysis and syntactic parsing. The lexer successfully tokenized the input into meaningful units, while the parser constructed the AST, which represents the abstract structure of the input expression. This process is a fundamental aspect of compiler and interpreter design, where the AST serves as a key intermediate representation used for code generation and optimization.

The implementation highlights how formal languages and finite automata can be leveraged to process and analyze programming languages. By tokenizing the input and parsing it into an AST, we provide a clear, abstract view of the input expression. This abstraction helps in simplifying the subsequent steps of code analysis, such as optimization or execution.

The work done in this project reinforced the importance of parsing and AST generation in the broader context of language processing. It underscored how theoretical concepts like formal grammars and finite automata directly translate into practical applications, enabling more efficient and structured program execution. As such, the project not only provided a deeper understanding of how compilers and interpreters work internally but also demonstrated how abstract syntax trees act as the backbone for these tools.


## 7. References

1. Formal Languages & Finite Automata — Lecture Notes  
2. Aho, Lam, Sethi, Ullman — *Compilers: Principles, Techniques, and Tools*  
3. [Recursive Descent Parsing](https://en.wikipedia.org/wiki/Recursive_descent_parser)  
4. [Abstract Syntax Trees](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
