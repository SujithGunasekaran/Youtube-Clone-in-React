const express = require('express')
const app = express()
var path = require('path')
const cors = require('cors')
const dotEnv = require('dotenv');

dotEnv.config()
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

// app.use(express.static('public'))
// app.get('*',(req,res) =>{
//     res.sendFile(path.join(__dirname+'/public/index.html'))
// })

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('public'))
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname+'/public/index.html'))
    })
}

app.use(express.json())
app.use(cors())
