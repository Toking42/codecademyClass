const debug = false;
// Drum Arrays
let kicks = new Array(16);
let snares = new Array(16);
let hiHats = new Array(16);
let rideCymbals = new Array(16);

let drumset = []
drumset['kicks'] = kicks;
drumset['snares']= snares;
drumset['hiHats']=hiHats;
drumset['rideCymbals']=rideCymbals;
// Initialise with false
kicks.fill(false);
snares.fill(false);
hiHats.fill(false);
rideCymbals.fill(false);

// Flip the state of Array at index
const toggleDrum = (arrayName, index) => {
  if(arrayName == undefined || index == undefined || index <0 || index > arrayName.length) return null;
  if(debug) console.log(arrayName +": "+index+" "+drumset[arrayName][index]);

  drumset[arrayName][index] = !drumset[arrayName][index];
}
// Test if call is valid
const validCall = (arrayName) => {
//console.log(arrayName+"->"+drumset[arrayName].length );

  if(arrayName == undefined) return false;
  if(drumset[arrayName] == undefined) return false;
  return true;

}

// set all values to false
const clear = (arrayName) => {
    if(!validCall(arrayName)) return null;
    for(let i = 0; i< drumset[arrayName].length; i++) {
      drumset[arrayName][i] = false;
    }
}

// set all values to inverted state
const invert = (arrayName) => {
  if(debug) console.log("--> invert");
  if(debug) console.log(drumset[arrayName]);
  if(!validCall(arrayName)) return null;
  for(let i = 0; i< drumset[arrayName].length; i++) {
    drumset[arrayName][i] = !drumset[arrayName][i];
  }

  if(debug) console.log(drumset[arrayName]);
  if(debug) console.log("<-- invert");

}


if(debug) console.log(validCall('kicks'));
if(debug) console.log(validCall('scheiß'));

if(debug) console.log(drumset['kicks'].length);
