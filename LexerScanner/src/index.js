// index.js
import Lexer from "./Lexer.js";

// You can adapt this input to test different scenarios.
const input = `

function doSomething() {

  if (x != 5) {
    x = 10
  }
}
`;

const lexer = new Lexer(input);
const tokens = lexer.tokenize();

// Print the tokens to see what the lexer recognized
console.log(tokens);
