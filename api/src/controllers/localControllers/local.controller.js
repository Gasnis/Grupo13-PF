const {Local,User} = require("../../db")

const postLocalData = async (localData) => {
    const {userId,name,category,image,location,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating }  = localData
    const searchLocal = await Local.findOne({
        where:{name: name}
    })

    if(!searchLocal){
        if(userId && name && category && image && location && menu && event && capacity && petFriendly && ageRange && phone && promo && bookPrice && available && rating){
            const local = await Local.create({name,category,image,location,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating})
            const searchUserById = await User.findByPk(userId) 
            await local.setUser(searchUserById);
            return local
        }throw new Error(`missing date`)
    }else{
        throw new Error(`The user ${name} was already create`)
    } 

}

const getLocalDetail = async (id) => {
    const local = await Local.findByPk(id);
    if (!local) {
        throw new Error("Local not found");
    }
    return local
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



module.exports = {postLocalData, getLocalName, getLocalDetail};

