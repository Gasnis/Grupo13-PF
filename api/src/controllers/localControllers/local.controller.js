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
    let local = await Local.findByPk(id,{
        where: {id: id},
        include:{
            model: Book,
          }
    });
    let  divisor  = local.rating.reduce((valorAnterior, valorActual) => (valorAnterior + valorActual));
    let dividendo = local.rating.reduce(function(valorAnterior, valorActual, indice){
    return valorAnterior + valorActual * (indice +1)})
    let ratin = (dividendo/divisor).toFixed(1) 
    
    console.log(local)
    
    local = {
            id: local.id,
            name: local.name,
            category: local.category,
            image: local.image,
            location: local.location,
            schedule: local.schedule,
            menu: local.menu,
            event: local.event,
            capacity: local.capacity,
            petFriendly: local.petFriendly,
            ageRange:local.ageRange,
            phone:local.phone,
            promo:local.promo,
            bookPrice:local.book,
            available:local.available,
            status: local.status,
            city:local.city,
            state:local.state,
            rating: ratin,
            books:local.books,
            userId:local.userId,
    }

    if (!local) {
        throw new Error("Local not found");
    }
    return local
}


const getLocalName = async (name) => {
  let localInfo = await Local.findAll({
    include:{
        model: Book,
    }
  });
  let mapeo = localInfo.map(local => {
    let  divisor  = local.rating.reduce((valorAnterior, valorActual) => (valorAnterior + valorActual));
    let dividendo = local.rating.reduce(function(valorAnterior, valorActual, indice){
    return valorAnterior + valorActual * (indice +1)})
    let ratin = (dividendo/divisor).toFixed(1) 
    let newInfo = {
        id: local.id,
        name: local.name,
        category: local.category,
        image: local.image,
        location: local.location,
        schedule: local.schedule,
        menu: local.menu,
        event: local.event,
        capacity: local.capacity,
        petFriendly: local.petFriendly,
        ageRange:local.ageRange,
        phone:local.phone,
        promo:local.promo,
        bookPrice:local.book,
        available:local.available,
        status: local.status,
        city:local.city,
        rating: ratin,
      }
    return newInfo
    
  })

  
  if (name) {
    mapeo = mapeo.filter((local) =>
      local.name.toLowerCase().includes(name.toLowerCase())
    );
    if (mapeo.length) {
      return mapeo
    }
  }
  return mapeo;
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
  
  const getRating = async (id) => {
    
  }

  const updateRating = async (id,rating)=>{

  }



module.exports = {postLocalData, getLocalName, getLocalDetail,deleteLocal,updateLocal};

