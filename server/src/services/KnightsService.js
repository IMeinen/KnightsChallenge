const KnightModel = require("../models/Knights");
 
exports.getAllKnights = async (filter) => {
  if(filter === 'heroes'){
    return await KnightModel.find({isHero:true});
  }
  return await KnightModel.find({isHero:false});
};

exports.createKnight = async (knight) => {
  const hasKnight = await KnightModel.find({name:knight.name});
  
  if(hasKnight.length){
    throw new Error('Knight já registrado')
  }
  return await KnightModel.create(knight);
};

exports.getKnightById = async (id) => {
  if(id.match(/^[0-9a-fA-F]{24}$/)){
    
    const knight = await KnightModel.findById(id);
    
    if(knight){
      return knight;
    }
    throw new Error('Nenhum Knight encontrado com esse id')
  }
  
  throw new Error('Formato do id invalido')

};
 
exports.updateKnight = async (id, knight) => {
  if(id.match(/^[0-9a-fA-F]{24}$/)){
  const updated = await KnightModel.findByIdAndUpdate(id, knight,{new: true});
  
    if(updated){
      return updated;
    }
    throw new Error('Nenhum Knight encontrado com esse id')
  }
  throw new Error('Formato do id invalido')
  
};
 
exports.deleteKnight = async (id) => {
  if(id.match(/^[0-9a-fA-F]{24}$/)){
    const knight = await KnightModel.findById(id);
  
    if(knight){
      await KnightModel.findByIdAndUpdate(id, {isHero: true},{new: true});
      
      return {message: 'O knight virou um herói agora!'}
     
    }
    throw new Error('Nenhum Knight encontrado com esse id')
  }
  throw new Error('Formato do id invalido')
};