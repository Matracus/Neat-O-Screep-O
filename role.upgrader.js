var roleUpgrader = {
    run: function(creep) {
    if(creep.memory.working == true && creep.carry.energy == 0) {
          creep.memory.working = false;
    }
    if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
    }
    if(creep.memory.working == true) {
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
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
        var storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {filter: (s) => (s.structureType == STRUCTURE_STORAGE)
                          && s.store[RESOURCE_ENERGY] > 0});
        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage);
        }/*
        var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(target) {
          if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }*/
      }
    }
	}
};
module.exports = roleUpgrader;
