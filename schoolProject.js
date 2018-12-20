// Codecademy School Project
// Author: Thomas Mack


class School {
  constructor (name, level, numberOfStudents) {
    this._name = name;
    this._level = level;
    this._numberOfStudents = numberOfStudents;
  }

  get name () {
    return this._name;
  }
  get level () {
    return this._level;
  }
  get numberOfStudents () {
    return this._numberOfStudents;
  }
  set numberOfStudents(num) {
    if(typeof num =='number' && num > 0) this._numberOfStudents = num;
    else 'Please provide a correct Number of Students';
  }
  quickFacts () {
    console.log(`${this._name} (${this._level}) with ${this._numberOfStudents} Students`);
  }

  static pickSubstituteTeacher () {
    return "Teacher";
  }

}

class Primary extends School {
  constructor(name, numberOfStudents, pickupPolicy) {
    super(name, 'primary', numberOfStudents);
    this._pichUpPolicy = pickupPolicy;
  }
  get pickupPolicy () {
    return this._pichUpPolicy;
  }
  quickFacts () {
    console.log(`${this._name} (${this._level}) with ${this._numberOfStudents} Students. Abholung: ${this._pichUpPolicy}`);
  }
}

class Middle extends School {
  constructor(name, numberOfStudents) {
    super(name, 'middle', numberOfStudents);
  }
}

class High extends School {
  constructor(name, numberOfStudents, sportsTeam) {
    super(name, 'high', numberOfStudents);
    this._sportsTeam = sportsTeam;
  }
  get sportsTeam () {
    return this._sportsTeam;
  }
}
const schools = [];

const p = new Primary('Grundschule', 100, 'abholen');
const h = new High('Hochschule', 2000,'Hockey');
const m = new Middle('Mittelschule', 500);

console.log(p.quickFacts());
console.log(h.quickFacts());
console.log(m.quickFacts());
