const input = await Deno.readTextFile('./input.txt')
const lines = input.trim().split('\n');

const configs = [
  { range: [0, 7], low: 'F', high: 'B' },
  { range: [7, 3], low: 'L', high: 'R' }, 
];

function parse(input) {
  return configs.map(config => {
    const chars = input.substr(...config.range).split('');
    const initial = [0, 2 ** chars.length - 1];

    return chars.reduce(([low, high], char, index) => {
      const half = ((high - low + 1) / 2) + low;
      switch(char) {
        case config.low: return [low, half - 1];
        case config.high: return [half, high];
        default: throw new Error(`Invalid char ${char}`);
      }
    }, initial)[0];
  })
}

function id([row, column]) {
  return row * 8 + column;
}

function part1() {
  const ids = lines
    .map(input => parse(input))
    .map(res => id(res))
  return Math.max(...ids);
}

function part2() {
  const seats = lines.map(input => parse(input));

  let targetSeat;
  for(let row = 0; row < 128; row++) {
    for(let column = 0; column < 8; column++) {
      const foundSeat = seats.find(seat => seat[0] === row && seat[1] === column);
      const frontSeat = seats.find(seat => seat[0] === row - 1 && seat[1] === column);
      const backSeat = seats.find(seat => seat[0] === row + 1 && seat[1] === column);
      if (!foundSeat && frontSeat && backSeat) {
        targetSeat = [row, column];
        break;
      }
    }
  }

  return id(targetSeat);
}

console.log(part1());
console.log(part2());