const {User} = require("../../db")

const postUserData = async (userData) => {
    const {id,name,password,phone,image,birthday,city } = userData

    if(id && name && password && phone &&image && birthday &&city ){
        const searchUser = await User.findOne({
            where:{id: id}
        })
        if(!searchUser){
            const user = await User.create({id,name,password,phone,image,birthday,city})
            return user
    
        }else{
            throw new Error(`The user ${id} was already create`)
        } 

    }else{
        throw new Error("Missing data")
    }
     
}

const getAllUsers = async () => {
    return User.findAll();
}

const getUserDetail = async (id) => {
    
    if (id) {
        const userDetail = await User.findOne({
            where: {id: id}
        })
        if (!userDetail) {
            throw new Error("you can't access the detail of an nonexistent user")
        }
        return userDetail
    }
}

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    user.destroy();
}

const updateUser = async (newUserData) =>{
    
  const {userId,id,name,password,phone,image,birthday,city} = newUserData

  if (userId && name && password && phone && image && birthday && city && id) {
      let user = await User.findByPk(id);
      if (user.id === userId) {
          const updated = await user.update( 
                  {
                  id,
                  name,
                  password,
                  phone,
                  image,
                  birthday,
                  city,
              });
          return updated
      }else{
          throw new Error("You must write your own email")
      }

  }else{
    throw new Error("Not all parameters arrived successfully")
  }
  
}




module.exports = {
    postUserData,
    getUserDetail,
    getAllUsers,
    deleteUser,
    updateUser
}
