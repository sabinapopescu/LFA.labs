console.log("Hello from index.js!");
// or anything else you want to see in the console

import { Grammar } from "./Grammar.js";

const grammar = new Grammar();
const fa = grammar.toFiniteAutomaton();

console.log(`121312`)

// Start with some manual test strings
const testStrings = ["jaeed", "afje"];

// Also generate 5 random strings from the grammar
for (let i = 0; i < 5; i++) {
  testStrings.push(grammar.generateString());
}

console.log("Generated strings:", testStrings);

for (const s of testStrings) {
  console.log(`String "${s}" is accepted by the FA? => ${fa.accept(s)}`);
}
