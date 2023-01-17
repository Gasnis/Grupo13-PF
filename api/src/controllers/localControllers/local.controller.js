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

const getLocalDetail = async (id) => {
    const local = await Local.findByPk(id);
    if (!local) {
        throw new Error("Local not found");
    }
    return local
}

module.exports = {postLocalData,getLocalDetail};