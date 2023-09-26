import jwt from 'jsonwebtoken'

const authorize = async(req, res, next) => {

// console.log( 'token', req.cookies);
const {authorization}=req.headers

console.log(authorization)

 if (!authorization) {
    return res.status(401).json({
        message:"unauthorized token is invalid"
    })
}
try {
    const decode = jwt.verify(authorization,process.env.JWT_SECRET)
    console.log('decoded',decode);
    const date = new Date(decode.exp *1000)
    const localtime = date.toLocaleString()
    console.log('date',localtime);
   
    req.user = decode.user
    next()
} catch (error) {
    console.log(error.message);
    res.status(500).json({
        message:"internal server error"
        
    })

}
}


export default authorize