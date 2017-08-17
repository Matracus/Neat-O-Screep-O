var roleUpgrader = require('role.upgrader');
var roleDefender = {
    run: function(creep) {
    if(creep.memory.working == true && creep.carry.energy == 0){
      creep.memory.working = false;
    }
    if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
      creep.memory.working = true;
    }
    if(creep.memory.working ==true){
        var reStocking = false;
      var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
          {filter: (s) => (s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity});
      if(structure != undefined){
        if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(structure);
          reStocking = true;
        }
      }
      if(!reStocking){
          var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.hits < (s.hitsMax/300) && s.structureType == STRUCTURE_WALL});
          if(structure != undefined){
            if(creep.repair(structure) == ERR_NOT_IN_RANGE){
              creep.moveTo(structure);
            }
          }
          else{
            roleUpgrader.run(creep);
          }
      }
    }
    else{
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
      if(creep.harvest(source) == ERR_NOT_IN_RANGE != undefined) {
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
module.exports = roleDefender;
