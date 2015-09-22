var html = {};
html.send = function(res, content){
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': content.length,
    'Expires': Date.now()
  });
}
