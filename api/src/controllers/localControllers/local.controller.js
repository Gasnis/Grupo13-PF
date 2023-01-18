const {Local,User} = require("../../db")

const postLocalData = async (localData) => {
    const {userId,name,category,image,location,schedule,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating }  = localData
    const searchLocal = await Local.findOne({
        where:{name: name}
    })

    if(!searchLocal){
        if(userId && name && category && image && location && schedule && menu && event && capacity && petFriendly && ageRange && phone && bookPrice ){
            const local = await Local.create({name,category,image,location,schedule,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating})
            const searchUserById = await User.findByPk(userId) 
            if(searchUserById){
                await local.setUser(searchUserById);
                return local
            }else{
                throw new Error(`You must create a user`)
            }
        }throw new Error(`missing data`)
    }else{
        throw new Error(`The local ${name} was already created`)
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
  const localInfo = await Local.findAll();
  if (name) {
    const byName = localInfo?.filter((local) =>
      local.name.toLowerCase().includes(name.toLowerCase())
    );
    if (byName.length) {
      return byName
    }else{
        throw new Error(`${name} not found :/`);
    }

   
  }
  return localInfo;
};


const deleteLocal = async (id) => {
    const local = await Local.findByPk(id);
    local.destroy();
}


const updateLocal = async (id,name,category,image,location,schedule,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating) =>{

    let local = await Local.findByPk(id);
    const updated = await local.update( 
            {
                name,
                category,
                image,
                location,
                schedule,
                menu,
                event,
                capacity,
                petFriendly,
                ageRange,
                phone,
                promo,
                bookPrice,
                available,
                rating
            });
    return updated
    }



module.exports = {postLocalData, getLocalName, getLocalDetail,deleteLocal,updateLocal};

