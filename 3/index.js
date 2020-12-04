const input = await Deno.readTextFile('./input.txt');
const lines = input.trim().split('\n').filter(Boolean);

function slope(step) {
  const [x, y] = step;
  let count = 0;
  let row = 0;
  let column = 0;
  
  while(lines[row]) {
    const col = column % lines[row].length;
    if (lines[row][col] === '#') {
      count ++;
    }
    row += y;
    column += x;
  }
  
  return count;
}

function part1() {
  return slope([3, 1]);
}

function part2() {
  const steps = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
  let count = 1;
  for(const step of steps) {
    count *= slope(step);
  }
  return count;
}

console.log('Part 1 result:', part1());

console.log('Part 2 result:', part2());