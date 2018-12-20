//Codecademy Project Library
// Author: Thomas Mack

class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title;
  }

  get isCheckedOut() {
    return this._isCheckedOut;
  }

  get ratings() {
    return this._ratings;
  }

  addRating (rating) {
    this._ratings.push(rating);
  }

  toggleCheckOutStatus () {
    this._isCheckedOut = !this._isCheckedOut;
  }

  getAverageRating () {
    if (this._ratings.length == 0) return 0;
    let sum = 0;
    this._ratings.forEach(r => {
      sum += r;
    });
    return sum/this._ratings.length;
  }

}


class Book extends Media {
  constructor(title, author, pages) {
    super(title);
    this._author = author;
    this._pages = pages;
  }
  get author() {
    return this._author;
  }
  get pages() {
    return this._pages;
  }
}

class Movie extends Media {
  constructor(title, director, runTime) {
    super(title);
    this._director = director;
    this._runTime = runTime;
  }
  get director() {
    return this._director;
  }
  get runTime() {
    return this._runTime;
  }
}

class Cd extends Media{
  constructor(title, artist, songs) {
    super(title);
    this._artist = artist;
    this._songs = runTime;
  }
  get artist() {
    return this._artist;
  }
  get songs() {
    return this._songs;
  }

}


// Main
const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544);
historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);
historyOfEverything.toggleCheckOutStatus();

console.log(historyOfEverything.getAverageRating())


const speed = new Movie('Jan de Bont', 'Speed', 116);
speed.toggleCheckOutStatus();
console.log(speed.getAverageRating())
console.log(speed.isCheckedOut);
