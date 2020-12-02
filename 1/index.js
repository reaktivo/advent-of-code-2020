const input = await Deno.readTextFile('./input.txt');
const numbers = input
  .split('\n')
  .map(Number);

function part1() {
  for (const a of numbers) {
    for (const b of numbers) {
      if (a + b === 2020) {
        return a * b;
      }
    }
  }
}
  
console.log(part1());

function part2() {
  for (const a of numbers) {
    for (const b of numbers) {
      for(const c of numbers) {
        if (a + b + c === 2020) {
          return a * b * c;
        }
      }
    }
  }
}

console.log(part2());

