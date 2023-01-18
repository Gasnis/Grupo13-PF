const {Book, Local, User} =require("../../db")


const postBookData = async (bookData) => {
    const {localId,userId, name,reservedDate,createdAt,updatedAt,personQuantity,codeProm} = bookData
    if( localId  && userId && name && reservedDate && createdAt && updatedAt && personQuantity && codeProm){ 

        const bookDataCreated = await Book.create({name,reservedDate,createdAt,updatedAt,personQuantity,codeProm})
    
        const searchLocalById = await Local.findByPk(localId)
       
        const searchUserById = await User.findByPk(userId)
    
        await bookDataCreated.setUser(searchUserById)
        await bookDataCreated.setLocal(searchLocalById)

        return bookDataCreated
    }else{
        throw new Error("missing Data")
    }
}

const getBookDetail = async (id) => {
    const local = await Local.findByPk(id);
    if (!local) {
        throw new Error("Local not found");
    }
    return local
}

module.exports = {postBookData,getBookDetail}