const input = await Deno.readTextFile('./input.txt');
const lines = input.split('\n').filter(Boolean);

const rows = lines.map(line => {
  const [policy, password] = line.split(': ');
  const [range, char] = policy.split(' ');
  const [min, max] = range.split('-').map(Number);
  return {
    password,
    min,
    max,
    char,
  }
})

function part1() {
  return rows
    .filter(row => {
      const charCount = row.password.length - row.password.replaceAll(row.char, '').length;
      return (charCount >= row.min && charCount <= row.max);
    })
    .length
}

console.log(part1());

function part2() {
  return rows
    .filter(row => {
      const letters = [row.min, row.max].map(position => row.password.charAt(position - 1))
      return letters.filter(char => char === row.char).length === 1;
    })
    .length;
}

console.log(part2());