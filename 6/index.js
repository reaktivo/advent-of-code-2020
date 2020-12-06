const input = await Deno.readTextFile('./input.txt')
const groups = input.trim().split('\n\n');

function unique(arr) {
  return [...new Set(arr)];
}

function part1() {
  return groups.reduce((count, group) => {
    const answers = group.split('\n');
    const lettersInGroup = unique(answers.join('').split(''));
    return count + lettersInGroup.length;
  }, 0);
}

function part2() {
  return groups.reduce((count, group) => {
    const answers = group.split('\n');
    const lettersInGroup = unique(answers.join('').split(''))
    return count + lettersInGroup.filter(letter => {
      return answers.every(answer => answer.includes(letter));
    }).length;
  }, 0);
}

console.log(part1())

console.log(part2());