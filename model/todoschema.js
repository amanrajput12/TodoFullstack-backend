import  mongoose  from 'mongoose'

const todoschema = new mongoose.Schema({

  title:{
    type:String,
    require:true
  },
  description:{
    type:String,
    require:true,
    unique:true
  },
  completed:{
    type:Boolean,
    require:true
  },
  user:{
    type:String,
    require:true
  }
    
    
},
{
    timestamps:true
}
)

export default mongoose.model('Todo', todoschema);