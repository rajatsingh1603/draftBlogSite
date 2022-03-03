import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const DB = "mongodb+srv://rajatsingh:kalam1603@cluster0.gquln.mongodb.net/blogsitedb?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    

}).then(()=>{
    console.log("DB connected successfully");
}).catch((err) =>{console.log(err)});

// mongoose.connect("mongodb://localhost:27017/BlogsiteDb", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("DB connected")
// })

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password,12);
    }
    next();
})
const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            const isMatch =  bcryptjs.compare(password,user.password);
            if(isMatch ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })

           

            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 



app.listen(9002,() => {
    console.log("BE started at port 9002")
})