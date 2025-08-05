const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
app.use(cors({
    origin:'https://frontend-library-2.onrender.com',
    credentials:true
}))
const port=process.env.PORT||3500
// bodyparser for req
app.use(express.json())
// setting the routes
app.use('/libraries',require('./routes/libraries'))
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
