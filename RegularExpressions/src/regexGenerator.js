// Helper to generate random integer between min and max (inclusive)
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Maps superscript to number
  const superscriptMap = {
    '²': 2,
    '³': 3
  };
  
  // Main function to generate a valid string from a regex-like input
  function generateFromRegex(regex) {
    let log = [];
    let i = 0;
  
    function parse() {
      let result = '';
  
      while (i < regex.length) {
        const char = regex[i];
  
        if (char === '(') {
          i++;
          let group = '';
          let depth = 1;
  
          while (i < regex.length && depth > 0) {
            if (regex[i] === '(') depth++;
            if (regex[i] === ')') depth--;
            if (depth > 0) group += regex[i++];
          }
  
          i++; // skip ')'
  
          const options = group.split('|');
          const choice = options[rand(0, options.length - 1)];
          log.push(`Chose option "${choice}" from group (${group})`);
          result += processGroup(choice);
  
        } else if (char === '*') {
          const prevChar = result[result.length - 1];
          const count = rand(0, 5);
          result = result.slice(0, -1) + prevChar.repeat(count);
          log.push(`Repeated "${prevChar}" ${count} times for "*"`);
  
          i++;
  
        } else if (char === '+') {
          const prevChar = result[result.length - 1];
          const count = rand(1, 5);
          result = result.slice(0, -1) + prevChar.repeat(count);
          log.push(`Repeated "${prevChar}" ${count} times for "+"`);
  
          i++;
  
        } else if (superscriptMap[char]) {
          const prevChar = result[result.length - 1];
          const count = superscriptMap[char];
          result = result.slice(0, -1) + prevChar.repeat(count);
          log.push(`Repeated "${prevChar}" exactly ${count} times for superscript "${char}"`);
  
          i++;
  
        } else {
          result += char;
          i++;
        }
      }
  
      return result;
    }
  
    function processGroup(group) {
      let savedIndex = i;
      i = 0;
      regex = group;
      const parsed = parse();
      i = savedIndex;
      regex = fullRegex;
      return parsed;
    }
  
    const fullRegex = regex; // preserve original
    const finalString = parse();
    return { result: finalString, steps: log };
  }
  
  // Example usage for the 3 regexes from Variant 4
  const regexes = [
    '(S|T)(U|V)w*y+24',
    'L(M|N)0³p*Q(2|3)',
    'R*S(T|U|V)W(X|Y|Z)²'
  ];
  
  regexes.forEach((regex, idx) => {
    const { result, steps } = generateFromRegex(regex);
    console.log(`Regex ${idx + 1}: ${regex}`);
    console.log('Generated String:', result);
    console.log('Processing Steps:');
    steps.forEach(step => console.log(' -', step));
    console.log('---------------------------');
  });
  