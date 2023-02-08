const {User, Local, Book} = require("../../db")


const postUserData = async (userData) => {
    let {id,name,password,phone,image,birthday,city } = userData
    if (!image){
        image = "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
    }
    if(id && name && password && phone &&image && birthday && city ){
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

const getAllUsers = async (name) => {
    let todos = await User.findAll();
    if (name) {
        const byName = todos.filter((local) =>
          local.name.toLowerCase().includes(name.toLowerCase())
        );
        if (byName.length) {
          return byName
        }else{
            throw new Error(`${name} not found :/`);
        }
    }
    return todos;
    
}

const getUserDetail = async (id) => {
    
    if (id) {
        const userDetail = await User.findOne({
            where: {id: id},
            include:[{
                model: Local,
                include:{
                    model:Book
                }
              },
              {
                model: Book
              }]
        })
        if (!userDetail) {
            throw new Error("you can't access the detail of an nonexistent user")
        }
        return userDetail
    }
}

const deleteUser = async (id) => {
    const searchAllLocalsByUser = await Local.findAll({
        where: {userId: id}
    })
    if(searchAllLocalsByUser.length){
        for(const local of searchAllLocalsByUser){
            const locals = await Local.findByPk(local.id);
            locals.destroy(); 
        }
    }

    const user = await User.findByPk(id);
    user.destroy();
}

const updateUser = async (newUserData) =>{
    
  const {id,name,password,phone,image,birthday,city,ban} = newUserData

  if (name && image && password && phone && birthday && city && id) {
      let user = await User.findByPk(id);
      if (user.id === id) {
          await user.update( 
                  {
                  id,
                  name,
                  password,
                  phone,
                  image,
                  birthday,
                  city,
                  ban,
              });
          const userUpdated = await User.findOne({
            where: {id: id},
            include:[{
                model: Local,
              },
              {
                model: Book
              }]
        })
          return userUpdated
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
