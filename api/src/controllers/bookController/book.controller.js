const {Book, Local, User} =require("../../db")


const postBookData = async (bookData) => {
    const {localId,userId, name,reservedDate,personQuantity,codeProm} = bookData
    if( localId && userId && name && reservedDate && personQuantity){ 

        const bookDataCreated = await Book.create({name,reservedDate,personQuantity,codeProm})
    
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

const getAllBooks = async () => {
    return Book.findAll();
}


const updateBook = async (id,name,reservedDate,createdAt,updatedAt,personQuantity,codeProm) =>{

    let book = await Book.findByPk(id);
    const updated = await book.update( 
            {
                name,
                reservedDate,
                createdAt,
                updatedAt,
                personQuantity,
                codeProm
            });
    return updated
    }


const deleteBook = async (id) => {
        const book = await Book.findByPk(id);
        if(book){
            book.destroy();  
        }
}
module.exports = {postBookData,getBookDetail,deleteBook,updateBook,getAllBooks}

