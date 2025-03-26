// index.js
import { Grammar } from "./Grammar.js";

const grammar = new Grammar();
const fa = grammar.to_finite_automaton();

console.log("Finite Automaton created:", fa);

// Generate 5 strings, each fully derived from the grammar
const fiveStrings = grammar.generate_n_strings(5);

console.log("Five valid strings following the grammar rules:", fiveStrings);

fiveStrings.forEach((s) => {
  console.log(`String '${s}' => accepted? ${fa.accept(s)}`);
});

// Classification
console.log("Classification:", grammar.classify());
