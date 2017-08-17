module.exports = function(){
  StructureSpawn.prototype.createCustomCreep = function(energy, roleName, workParts, carryParts, moveParts){
    var body = [];
    for(let i = 0; i < workParts; i++){
      body.push(WORK)
    }
    for(let i = 0; i < carryParts; i++){
      body.push(CARRY)
    }
    for(let i = 0; i < moveParts; i++){
      body.push(MOVE)
    }
    return this.createCreep(body, undefined, {role: roleName, working: false})
  }
  StructureSpawn.prototype.createBalancedCreep = function(energy, roleName){
    var numberOfParts = Math.floor(energy / 200);
    var body = [];
    for(let i = 0; i < numberOfParts; i++){
      body.push(WORK)
    }
    for(let i = 0; i < numberOfParts; i++){
      body.push(CARRY)
    }
    for(let i = 0; i < numberOfParts; i++){
      body.push(MOVE)
    }
    return this.createCreep(body, undefined, {role: roleName, working: false})
  }
};


//total energy nu 1800
