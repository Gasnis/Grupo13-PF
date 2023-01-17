const {Local} = require("../../db")

const postLocalData = async (localData) => {
    const {id,name,category,image,location,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating }  = localData

    const searchLocal = await Local.findOne({
        where:{id: id}
    })

    if(!searchLocal){
        const local = await Local.create({id,name,category,image,location,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating})
        return local
    }else{
        throw new Error(`The user ${name} was already create`)
    } 



}

const getLocalName = async (name) => {
  const localInfo = Local.findAll();
  if (name) {
    const byName = localInfo.filter((local) =>
      local.name.toLowerCase().includes(name.toLowerCase())
    );
    if (byName.length === 0) {
      throw new Error(`${name} not found :/`);
    }

    return byName;
  }
  return localInfo;
};



module.exports = {postLocalData, getLocalName};