import Lexer from "./Lexer.js";
import Parser from "./Parser.js";
import { drawASTTree } from "./prettyTree.js";

const input = "12 + (variableName - 34) * 56 / variable_2";
const lexer = new Lexer(input);
const tokens = lexer.tokenize();

console.log("Tokens:", tokens);

const parser = new Parser(tokens);
const ast = parser.parseExpression();

console.log("AST:", JSON.stringify(ast, null, 2));


console.log("Pretty Tree View:\n");
console.log(drawASTTree(ast));


// // Pretty printer (optional)
// function printAST(node, indent = 0) {
//   const pad = ' '.repeat(indent);
//   if (node.type === "BinaryOperator") {
//     console.log(`${pad}${node.operator}`);
//     printAST(node.left, indent + 2);
//     printAST(node.right, indent + 2);
//   } else if (node.type === "Number") {
//     console.log(`${pad}${node.value}`);
//   } else if (node.type === "Variable") {
//     console.log(`${pad}${node.identifier}`);
//   }
// }
printAST(ast);