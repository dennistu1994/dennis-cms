define(function(){
  var Resolutions = {};

  function make_res(width,height){
    return {width: width, height: height, aspect_ratio: width/height};
  }
  Resolutions["1080p"]  = make_res(1920, 1080);
  Resolutions["720p"] = make_res(1280, 720);

  return Resolutions;
});
