// Codecademy TeamStats Project
// Author: Thomas Mack
const team = {
    _players: [
      {
        firstName: 'Pablo',
        lastName: 'Sanchez',
        age: 11
      },
      {
        firstName: 'Patricia',
        lastName: 'Bedkowski',
        age: 42
      },
      {
        firstName: 'Achim',
        lastName: 'Falk',
        age: 51
      }
    ],
    _games: [
      {
        opponent: 'Broncos',
        teamPoints: 42,
        opponentPoints: 27
      },
      {
        opponent: 'HV1',
        teamPoints: 42,
        opponentPoints: 27
      },
      {
        opponent: 'PSC',
        teamPoints: 42,
        opponentPoints: 27
      }

    ],

    get players () {
      return this._players;
    },
    get games () {
      return this._games;
    },

    addPlayer (firstName, lastName, age) {
      let player = {
        firstName,
        lastName,
        age
      }
      this._players.push(player);
    },

    addGameResult (opponent, teamPoints, opponentPoints) {
      let game = {
        opponent, teamPoints, opponentPoints
      }
      this._games.push(game);

    }
}

team.addPlayer('Steph','Curry',28);
team.addPlayer('Lisa','Leslie',44);
team.addPlayer('Bugs','Bunny',76);

console.log(team.players);
console.log(team.games);
