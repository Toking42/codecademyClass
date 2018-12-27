/*
Es gibt ein Object Element
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#Methods_of_the_Object_constructor
damit hat man Zugriff auf Metainformationen zu einem Object.
z.B. alle Keys, alle Entries und

*/
const robot = {
	model: 'SAL-1000',
  mobile: true,
  sentient: false,
  armor: 'Steel-plated',
  energyLevel: 75
};

// What is missing in the following method call?
const robotKeys = Object.keys(robot);

console.log(robotKeys);

// Declare robotEntries below this line:
const robotEntries = Object.entries(robot);

console.log(robotEntries);

// Declare newRobot below this line:

// Hier wird ein neuer Roboter von einem anderen Erzeugt und mit zwei neuen Eigenschaften ausgestatte
const newRobot = Object.assign({laserBlaster: true, voiceRecognition: true},robot);
//newRobot.laserBlater = true;
//newRobot.voiceRecognition = true;
console.log(newRobot);
