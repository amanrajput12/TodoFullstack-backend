import  mongoose from 'mongoose'
const conncectToDb=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((db)=>{
         console.log(`Db connect sucesss`);
    })
    .catch((err)=>{
        console.log(`Db connect refuse`);
    })
}
export default conncectToDb;