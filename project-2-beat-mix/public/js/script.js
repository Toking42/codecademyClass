const debug = false;

const initEmptyArray = (size) => {
  return new Array(size).fill(false);
}

// Drum Arrays
let kicks = initEmptyArray(16);
let snares = initEmptyArray(16);
let hiHats = initEmptyArray(16);
let rideCymbals = initEmptyArray(16);

let drumset = []
drumset['kicks'] = kicks;
drumset['snares']= snares;
drumset['hiHats']=hiHats;
drumset['rideCymbals']=rideCymbals;


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


const getNeighborPads = (x,y,size) => {
  // Test for valid input x and y
  //console.log(x+","+y+","+size);
  if(x<0 || y<0 || x>size-1 || y>size-1) return [];
  let result = [];
  // Left Corner
  var top = [x,y-1];
  var right = [x+1,y];
  var bottom = [x,y+1];
  var left = [x-1,y];

  if(top[1]>-1) result.push(top);
  if(right[0]<size) result.push(right);
  if(bottom[1]<size) result.push(bottom);
  if(left[0]>-1) result.push(left);
  return result;
}

if(debug) console.log(validCall('kicks'));
if(debug) console.log(validCall('scheiß'));

if(debug) console.log(drumset['kicks'].length);
