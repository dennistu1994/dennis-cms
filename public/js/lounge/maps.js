define(['lounge/resources'], function(){
  var Maps = {
    test: new Map('test', ['test64'])
  };

  function Map(id, resource_ids){
    this.units=[];
    this.id=id;
    this.resource_ids = resource_ids;
    this.loaded = false;
  }

  return Maps;
});
