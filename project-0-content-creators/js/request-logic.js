// We at Content Creators know this code is useful for getting the
// extension off of the supplied filename, but we can't figure out the rest of
// the function to use it! We hope this is useful to you!


function getContentType(filename) {
  const extension = filename.match(/.*\.([^\.]*)$/)[1];
  //console.log(extension);
  switch (extension.toLowerCase()) {
    case 'html':
      return 'text/html';
      break;
    case 'css':
      return 'text/css';
      break;
    case 'jpg':
      return 'image/jpeg';
      break;
    case 'jpeg':
      return 'image/jpeg';
      break;

    default:
      return 'text/plain';
      break;

  }
}

getContentType('index.html');
