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
    const book = await Book.findByPk(id);
    if (!book) {
        throw new Error("Book not found");
    }
    return book
}

const deleteBook = async (id) => {
        const book = await Book.findByPk(id);
        if(book){
            book.destroy();  
        }
}
module.exports = {postBookData,getBookDetail,deleteBook}