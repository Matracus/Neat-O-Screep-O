var roleUpgrader = require('role.upgrader');
var roleBuilder = {
    run: function(creep) {
    if(creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;
    }
    if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }
    if(creep.memory.working == true) {
      var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if(target != undefined) {
        if(creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
      else{
        roleUpgrader.run(creep);
      }
    }
    else {
      var sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
      var source = undefined;
      var shortestPath = 999;
      for(var i = 0; i < sources.length; i++){
        if(sources[i].energy > 0 && creep.pos.findPathTo(sources[i]).length < shortestPath){
          source = sources[i];
          shortestPath = creep.pos.findPathTo(sources[i]).length;
        }
      }
      //var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if(creep.harvest(source) == ERR_NOT_IN_RANGE && source != undefined) {
          creep.moveTo(source);
      }
      else if(source == undefined){
        var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(target) {
          if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      }
    }
	}
};
module.exports = roleBuilder;
