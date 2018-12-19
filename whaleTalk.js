// Codecademy Whale talk

let input = 'Loch in Erde Masse rin Glock fertig bim bim bim';
let vowels = ['a','e','i','o','u','y'];
let resultArray = [];


for (let i = 0;i<input.length;i++) {
  for (let j = 0; j<vowels.length;j++) {
    var char = input[i].toLowerCase();
    if(char === vowels[j]) {
      if(char === 'e' || char === 'u') resultArray.push(input[i]);
      resultArray.push(input[i]);
    }
  }
}

console.log(resultArray.join('').toUpperCase());
