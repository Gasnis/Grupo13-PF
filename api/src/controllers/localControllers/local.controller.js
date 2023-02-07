const {Local,User, Book} = require("../../db")

const postLocalData = async (localData) => {
    const {userId,name,category,image,location,schedule,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating,city,state}  = localData
    const searchLocal = await Local.findOne({
        where:{name: name}
    })
    

    if(!searchLocal){
        
        const searchUserById = await User.findByPk(userId) 
        if(searchUserById){
                const local = await Local.create({name,category,image,location,schedule,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating,city,state})
                await local.setUser(searchUserById);
                return local
            }else{
                throw new Error(`You must create a user`)
            }
    }else{
        throw new Error(`The local ${name} was already created`)
    } 

}

const getLocalDetail = async (id) => {
    const local = await Local.findByPk(id,{
        where: {id: id},
        include:{
            model: Book,
          }
    });
    if (!local) {
        throw new Error("Local not found");
    }
    return local
}


const getLocalName = async (name) => {
  let localInfo = await Local.findAll();
  if (name) {
    localInfo = localInfo.filter((local) =>
      local.name.toLowerCase().includes(name.toLowerCase())
    );
    if (localInfo.length) {
      return localInfo
    }
  }
  return localInfo;
};


const deleteLocal = async (id) => {
    const local = await Local.findByPk(id);
    if(local){
        local.destroy();
    }else{
        return ("Ese"+ id + "no se encontro")
    }
}


const updateLocal = async (id,name,category,image,location,schedule,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating,status,city,state) =>{
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
                rating,
                status,
                city,
                state
            });
    return updated
    }



module.exports = {postLocalData, getLocalName, getLocalDetail,deleteLocal,updateLocal};

