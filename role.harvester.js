require("prototype.creep")();
var roleHarvester = {
    run: function(creep) {
    if(creep.memory.working == true && creep.carry.energy == 0){
      creep.memory.working = false;
    }
    if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
      creep.memory.working = true;
    }
    if(creep.memory.working ==true){
      var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
          {filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION)
                        && s.energy < s.energyCapacity});
      if(structure != undefined){
        if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(structure);
        }
      }
    }
    else{
      if(!creep.behaveHarvest()){
        creep.behaveFindDropedResources();
      }
    }
	}
};
module.exports = roleHarvester;
