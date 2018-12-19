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




// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;


//console.log(presetHandler('GET',1,[]));
//console.log(presetHandler('GET',undefined,[]));
//console.log(presetHandler('GET',-1,[]));
