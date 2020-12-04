import validators from './validators.js';
const input = await Deno.readTextFile('./input.txt');

const list = input
  .trim()
  .split('\n\n')
  .filter(Boolean)
  .map(row => Object.fromEntries(
    row
      .split('\n')
      .join(' ')
      .split(' ')
      .map(entry => entry.split(':'))
    )
  )
;

function part1() {
  const requiredKeys = ["hgt", "eyr", "iyr", "byr", "ecl", "pid", "hcl"];
  return list
    .filter(row => requiredKeys.every(key => key in row))
    .length
}

function part2() {
  const validatorEntries = Object.entries(validators)
  return list.filter(row => {
    return validatorEntries.every(([key, validator]) => {
      const result = validator(row[key] || '');
      return result;
    });
  }).length;
}

console.log('Part 1 result:', part1());

console.log('Part 2 result:', part2());