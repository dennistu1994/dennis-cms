define(['lounge/resources'],function(Resources){
  var Loader = {};
  var three_loader = new THREE.ImageLoader();
  Loader.load_map = function(map, on_complete, on_progress, on_error){
    var context = {
      success_count: 0,
      total: map.resource_ids.length
    };
    function check_completion(){
      context.success_count++;
      if(context.success_count === context.total){
        map.loaded = true;
        on_complete(context);
      } else {
        if(typeof on_progress==="function"){
          on_progress(context);
        }
      }
    }
    console.log(map.resource_ids);
    map.resource_ids.forEach(function(resource_id){
      switch(Resources[resource_id].type){
        default:
        case Resources.IMAGE:
        case Resources.SPRITESHEET:
          three_loader.load(Resources[resource_id].path,
          function(image){
            //image
            //context is resource object
            this.loaded = true;
            this.data = image;
            check_completion();
          }.bind(Resources[resource_id]),
          function(xhr){
            //progress
          },
          function(xhr){
            //error
          });
          break;
      }
    });
  };
  return Loader;
});
