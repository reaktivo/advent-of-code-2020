const input = await Deno.readTextFile('./input.txt');

function list() {
  return input
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
}

function part1() {
  const requiredKeys = ["hgt", "eyr", "iyr", "byr", "ecl", "pid", "hcl"];
  return list()
    .filter(row => requiredKeys.every(key => key in row))
    .length
}



console.log(part1());
