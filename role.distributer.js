var roleUpgrader = require('role.upgrader');
var roleDistributer = {
    run: function(creep) {
    if(creep.memory.working == true && creep.carry.energy == 0){
      creep.memory.working = false;
    }
    if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
      creep.memory.working = true;
    }
    if(creep.memory.working ==true){
      var storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
          {filter: (s) => (s.structureType == STRUCTURE_STORAGE)
                        && s.store[RESOURCE_ENERGY] < s.storeCapacity});
      if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage);
      }
    }
    else{
      var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
          {filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                        && s.store[RESOURCE_ENERGY] != 0)});
      if(structure != undefined){
        if(creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(structure);
        }
      }
      else{
        roleUpgrader.run(creep);
      }
    }
	}
};
module.exports = roleDistributer;
