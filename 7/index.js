const input = await Deno.readTextFile('./input.txt')
const clean = str => str.replace(/\ bags?[\. ]?/gi, '')

function getBags(input) {
  const lines = input.trim().split('\n');
  const entries = lines.map(line => {
    const chunks = line.split(' bags contain ');
    const left = chunks[0];
    const right = clean(chunks[1])
    let value = {};
    if (right !== 'no other') {
      value = Object.fromEntries(
        right.split(', ').map(item => {
          const [left, ...rest] = clean(item).split(' ');
          return [rest.join(' '), Number(left)];
        })
      )
    }
    
    return [left, value];
  })

  return Object.fromEntries(entries);
}

function calculatePart1(input, target) {
  const bags = { ...getBags(input), [target]: null };

  function bagCanContainTarget(bags, key) {
    if (!bags[key]) {
      return false;
    }

    if (bags[key][target]) {
      return true;
    }

    const restBags = {...bags, [key]: null};
    return Object.keys(bags[key]).some(key => bagCanContainTarget(restBags, key));
  }

  const filteredBags = Object.keys(bags).filter(key => bagCanContainTarget(bags, key));
  return filteredBags.length;
}

function calculatePart2(input, target) {
  const results = {};
  const bags = getBags(input);

  function bagCanContainCount(key) {
    if (key in results) {
      return results[key];
    }

    results[key] = Object.entries(bags[key]).reduce((count, [key, value]) => {
      return count + value + bagCanContainCount(key) * value;
    }, 0);

    return results[key];
  }

  return bagCanContainCount(target);
}

function part1() {
  return calculatePart1(input, 'shiny gold')
}

function part2() {
  return calculatePart2(input, 'shiny gold');
}

console.log(part1());
console.log(part2());