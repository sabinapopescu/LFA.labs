// index.js
import { Grammar } from "./Grammar.js";

const grammar = new Grammar();
const fa = grammar.to_finite_automaton();

console.log("Finite Automaton created:", fa);

// Let’s pick some test strings (including one you know is derivable: "adba")
let testStrings = ["ab", "ad", "bd", "bbba", "adba"];

// Also generate 5 random strings from the grammar
for (let i = 0; i < 5; i++) {
  testStrings.push(grammar.generate_string());
}

console.log("Generated strings to test:", testStrings);

testStrings.forEach((s) => {
  console.log(`String '${s}' => accepted? ${fa.accept(s)}`);
});

console.log("Classification:", grammar.classify());
