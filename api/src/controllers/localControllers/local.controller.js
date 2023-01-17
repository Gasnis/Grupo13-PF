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

module.exports = postLocalData;