var fs = require('fs');
function log(msg, filename){
  fs.writeFile(filename, msg, 'utf8',  function(err){
    if(err){
      console.log(err);
    }
  });
}

module.exports = log;
