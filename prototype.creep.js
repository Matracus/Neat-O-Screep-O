module.exports = function(){
  Creep.prototype.behaveHarvest = function(){
    var sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
    var source = undefined;
    var shortestPath = 999;
    for(var i = 0; i < sources.length; i++){
      if(sources[i].energy > 0 && this.pos.findPathTo(sources[i]).length < shortestPath){
        source = sources[i];
        shortestPath = this.pos.findPathTo(sources[i]).length;
      }
    }
    //var source = creep.pos.findClosestByPath(FIND_SOURCES);
    if(this.harvest(source) == ERR_NOT_IN_RANGE && source != undefined) {
      this.moveTo(source);
    }
    else if(source == undefined){
      return false;
    }
  }
  Creep.prototype.behaveFindDropedResources = function(){
    var target = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    if(target) {
      if(this.pickup(target) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
      }
    }
  }
};
