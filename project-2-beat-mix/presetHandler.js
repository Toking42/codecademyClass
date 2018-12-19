// Use this presets array inside your presetHandler
const presets = require('./presets');

const debug = true;


// Complete this function:
const presetHandler = (method, index, newPresetArray) => {
    // Test if invalid Mehtod set Status 400 Bad Request
    if(!(method === 'GET' || method === 'PUT')) return [400,''];


    // Test if valid index is passed and set StatusCode
    if(index == undefined || typeof index !='number' || index <0 || (index >0 && index > presets.length)) return  [404,''];

    // Init the result
    const result = [200,-1];

    if(method === 'GET') result[1] = presets[index];
    else if(method === 'PUT') {
    //  console.log("Method: "+method+", Index: "+index+" / "+newPresetArray);

      presets[index] = newPresetArray;
      result[1] = presets[index];
      //console.log("r"+result);
    }
    return result;
}


const getNeighborPads = (x,y,size) => {
  // Test for valid input x and y
  if(x>size-1 || y>size-1) return [];
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

if(debug)console.log(getNeighborPads(2,2,10));

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;


//console.log(presetHandler('GET',1,[]));
//console.log(presetHandler('GET',undefined,[]));
//console.log(presetHandler('GET',-1,[]));
