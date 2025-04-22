class Grammar {
    constructor(nonTerminals, terminals, productions, startSymbol) {
        this.nonTerminals = new Set(nonTerminals);
        this.terminals = new Set(terminals);
        this.productions = productions; // { lhs: [rhs1, rhs2, ...] }
        this.startSymbol = startSymbol;
        this.newVarCount = 0;
    }

    getNewVariable(prefix = "X") {
        let symbol;
        do {
            symbol = `${prefix}${this.newVarCount++}`;
        } while (this.nonTerminals.has(symbol));
        this.nonTerminals.add(symbol);
        return symbol;
    }

    eliminateEpsilonProductions() {
        const nullable = new Set();

        // Step 1: Find nullable variables
        let changed;
        do {
            changed = false;
            for (let [lhs, rhsList] of Object.entries(this.productions)) {
                for (let rhs of rhsList) {
                    if (rhs.length === 0 || rhs.every(symbol => nullable.has(symbol))) {
                        if (!nullable.has(lhs)) {
                            nullable.add(lhs);
                            changed = true;
                        }
                    }
                }
            }
        } while (changed);

        // Step 2: Generate new rules excluding nullable variables
        const newProductions = {};
        for (let [lhs, rhsList] of Object.entries(this.productions)) {
            newProductions[lhs] = [];
            for (let rhs of rhsList) {
                const combinations = this._generateNullableCombinations(rhs, nullable);
                for (let combo of combinations) {
                    if (combo.length > 0 || lhs === this.startSymbol) {
                        if (!newProductions[lhs].some(existing => existing.join() === combo.join())) {
                            newProductions[lhs].push(combo);
                        }
                    }
                }
            }
        }

        this.productions = newProductions;
    }

    _generateNullableCombinations(rhs, nullable) {
        const results = [[]];
        for (let symbol of rhs) {
            const temp = [];
            for (let r of results) {
                temp.push([...r, symbol]);
                if (nullable.has(symbol)) {
                    temp.push([...r]);
                }
            }
            results.splice(0, results.length, ...temp);
        }
        return results;
    }

    eliminateUnitProductions() {
        const newProductions = {};
        for (let nonTerminal of this.nonTerminals) {
            newProductions[nonTerminal] = [];
        }

        for (let lhs of this.nonTerminals) {
            const closure = this._unitClosure(lhs);
            for (let symbol of closure) {
                for (let rhs of this.productions[symbol] || []) {
                    if (!(rhs.length === 1 && this.nonTerminals.has(rhs[0]))) {
                        newProductions[lhs].push(rhs);
                    }
                }
            }
        }

        this.productions = newProductions;
    }

    _unitClosure(symbol) {
        const closure = new Set([symbol]);
        const stack = [symbol];
        while (stack.length) {
            const top = stack.pop();
            for (let rhs of this.productions[top] || []) {
                if (rhs.length === 1 && this.nonTerminals.has(rhs[0]) && !closure.has(rhs[0])) {
                    closure.add(rhs[0]);
                    stack.push(rhs[0]);
                }
            }
        }
        return closure;
    }

    eliminateInaccessibleSymbols() {
        const reachable = new Set([this.startSymbol]);
        const stack = [this.startSymbol];
        while (stack.length) {
            const current = stack.pop();
            for (let rhs of this.productions[current] || []) {
                for (let symbol of rhs) {
                    if ((this.nonTerminals.has(symbol) || this.terminals.has(symbol)) && !reachable.has(symbol)) {
                        reachable.add(symbol);
                        if (this.nonTerminals.has(symbol)) stack.push(symbol);
                    }
                }
            }
        }

        this.nonTerminals = new Set([...this.nonTerminals].filter(x => reachable.has(x)));
        this.terminals = new Set([...this.terminals].filter(x => reachable.has(x)));

        for (let key of Object.keys(this.productions)) {
            if (!reachable.has(key)) delete this.productions[key];
        }
    }

    eliminateNonProductiveSymbols() {
        const productive = new Set();
        let changed;
        do {
            changed = false;
            for (let [lhs, rhsList] of Object.entries(this.productions)) {
                for (let rhs of rhsList) {
                    if (rhs.every(symbol => this.terminals.has(symbol) || productive.has(symbol))) {
                        if (!productive.has(lhs)) {
                            productive.add(lhs);
                            changed = true;
                        }
                    }
                }
            }
        } while (changed);

        this.nonTerminals = new Set([...this.nonTerminals].filter(x => productive.has(x)));
        for (let key of Object.keys(this.productions)) {
            if (!productive.has(key)) delete this.productions[key];
        }
    }

    toChomskyNormalForm() {
        // Replace terminals in long productions
        const termMap = {};
        for (let [lhs, rhsList] of Object.entries(this.productions)) {
            this.productions[lhs] = rhsList.map(rhs => {
                if (rhs.length > 1) {
                    return rhs.map(sym => {
                        if (this.terminals.has(sym)) {
                            if (!termMap[sym]) {
                                const newVar = this.getNewVariable("T");
                                termMap[sym] = newVar;
                                this.productions[newVar] = [[sym]];
                                this.nonTerminals.add(newVar);
                            }
                            return termMap[sym];
                        }
                        return sym;
                    });
                }
                return rhs;
            });
        }

        // Break down rules longer than 2
        const newProductions = {};
        for (let [lhs, rhsList] of Object.entries(this.productions)) {
            newProductions[lhs] = [];
            for (let rhs of rhsList) {
                if (rhs.length <= 2) {
                    newProductions[lhs].push(rhs);
                } else {
                    let current = rhs[0];
                    for (let i = 1; i < rhs.length - 1; i++) {
                        const newVar = this.getNewVariable("X");
                        newProductions[newVar] = [[current, rhs[i]]];
                        current = newVar;
                    }
                    newProductions[lhs].push([current, rhs[rhs.length - 1]]);
                }
            }
        }

        this.productions = newProductions;
    }

    printGrammar() {
        console.log("CNF Grammar:\n");
        for (let lhs of [...this.nonTerminals].sort()) {
          const rhsList = this.productions[lhs] || [];
          const formattedProductions = rhsList.map(rhs => rhs.length > 0 ? rhs.join(" ") : "ε");
          console.log(`${lhs} → ${formattedProductions.join(" | ")}`);
        }
      }
      
}

// --- Example: Apply Variant 24 ---

const grammar = new Grammar(
    ["S", "A", "B", "C"],
    ["a", "d"],
    {
        S: [["d", "B"], ["A"]],
        A: [["d"], ["d", "S"], ["a", "B", "d", "A", "B"]],
        B: [["a"], ["d", "A"], ["A"], []],
        C: [["A", "a"]],
    },
    "S"
);

// Apply transformation steps
grammar.eliminateEpsilonProductions();
grammar.eliminateUnitProductions();
grammar.eliminateInaccessibleSymbols();
grammar.eliminateNonProductiveSymbols();
grammar.toChomskyNormalForm();
grammar.printGrammar();