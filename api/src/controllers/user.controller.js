const {User} = require("../db")

const postUserData = async (userData) => {
    const {id,name,password,phone,image,birthday,city }  = userData

    const searchUser = await User.findOne({
        where:{id: id}
    })

    if(!searchUser){
        console.log(searchUser)
        const user = await User.create({id,name,password,phone,image,birthday,city})
        return user
    }else{
        throw new Error(`The user ${id} was already create`)
    } 



}

module.exports = postUserData;