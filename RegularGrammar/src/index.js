// RegularGrammar/src/index.js
import { FiniteAutomaton } from "./FiniteAutomaton.js";

// 1) Define the FA components based on Variant 24
const states = ["q0", "q1", "q2"];
const alphabet = ["a", "b"];
const transitions = [
  // δ(q0, b) = q0
  { src: "q0", char: "b", dest: "q0" },
  // δ(q0, b) = q1
  { src: "q0", char: "b", dest: "q1" },
  // δ(q1, b) = q2
  { src: "q1", char: "b", dest: "q2" },
  // δ(q0, a) = q0
  { src: "q0", char: "a", dest: "q0" },
  // δ(q1, a) = q1
  { src: "q1", char: "a", dest: "q1" },
  // δ(q2, a) = q2
  { src: "q2", char: "a", dest: "q2" }
];

const startState = "q0";
const acceptStates = ["q2"];

// 2) Create the FA object
const fa = new FiniteAutomaton(states, alphabet, transitions, startState, acceptStates);

// 3) Test some input strings
const testStrings = [
  "",        // empty string
  "b",       // single 'b'
  "bb",      // multiple 'b'
  "abb",     // a then b
  "bbb",     // ...
  "aaa",
  "baaaaab", // etc.
  "abba",
  "bababa",
  "bba"  
];

for (const s of testStrings) {
  const accepted = fa.accept(s);
  console.log(`String "${s}" => accepted? ${accepted}`);
}
