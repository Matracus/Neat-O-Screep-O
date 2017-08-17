require("prototype.spawn")();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var roleDistributer = require('role.distributer');

module.exports.loop = function () {
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
    }
  }
  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    //creep.say(creep.memory.role);
    if(creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if(creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if(creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
    if(creep.memory.role == 'repairer') {
      roleRepairer.run(creep);
    }
    if(creep.memory.role == 'defender') {
      roleDefender.run(creep);
    }
    if(creep.memory.role == 'distributer') {
      roleDistributer.run(creep);
    }
  }
  var hostiles = Game.spawns.Spawn1.room.find(FIND_HOSTILE_CREEPS);
  if(hostiles.length > 0){
    var towers = Game.spawns.Spawn1.room.find(
      FIND_MY_STRUCTURES, {filter: {structureType:STRUCTURE_TOWER}});
    towers.forEach(tower => tower.attack(hostiles[0]));
  }

  var cHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
  var cBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
  var cUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
  var cRepairers = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
  var cDefenders = _.sum(Game.creeps, (c) => c.memory.role == "defender");
  var cDistributer = _.sum(Game.creeps, (c) => c.memory.role == "distributer");
  var minHarvesters = 2;
  var minUpgraders = 1;
  var minBuilders = 1;
  var minRepairers = 1;
  var minDefenders = 1;
  var minDistributer = 1;
  var name = undefined;
  var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;



  //console.log(energy);
  if(cHarvesters < minHarvesters){
    name = Game.spawns.Spawn1.createBalancedCreep(energy, "harvester");
    if(name == ERR_NOT_ENOUGH_ENERGY && cHarvesters == 0){
      name = Game.spawns.Spawn1.createBalancedCreep(Game.spawns.Spawn1.room.energyAvailable, "harvester");
    }
  }
  else if(cUpgraders < minUpgraders){
    name = Game.spawns.Spawn1.createBalancedCreep(energy, "upgrader");
  }
  else if(cBuilders < minBuilders){
    name = Game.spawns.Spawn1.createBalancedCreep(energy, "builder");
  }
  else if(cRepairers < minRepairers){
    name = Game.spawns.Spawn1.createBalancedCreep(energy, "repairer");
  }
  else if(cDefenders < minDefenders){
    name = Game.spawns.Spawn1.createBalancedCreep(energy, "defender");
  }
  else if(cDistributer < minDistributer){
    name = Game.spawns.Spawn1.createBalancedCreep(energy, "distributer");
  }
  //console.log(name);
  if(!(name < 0) && name != undefined){
    console.log("Spawned " + name + " as a " + Game.creeps[name].memory.role);
  }
}
