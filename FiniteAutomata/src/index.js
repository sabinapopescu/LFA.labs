import { FiniteAutomaton } from "./FiniteAutomaton.js";

const fa = new FiniteAutomaton();

console.log("=== Regular Grammar ===");
console.log(fa.to_regular_grammar());

console.log("\n=== Is FA Deterministic? ===");
console.log(fa.is_deterministic());

console.log("\n=== Converted to DFA ===");
console.log(fa.to_dfa());
