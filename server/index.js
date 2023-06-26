const express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const {fileURLToPath} = require("url");
const authRoutes = require("./routes/auth");
const {register} = require("./controllers/auth");
const {verifyToken} = require("./middleware/auth");
const {createPost} =require("./controllers/posts.js")
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts");
// Configuration 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(BodyParser.json({limit:"30mb",extended:true}));
app.use(BodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));


//File storage
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({storage});

//routes with files
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts",verifyToken,upload.single("picture"),createPost);
//routes
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);
//mongoose
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server PORT: ${PORT}`))
}).catch((err)=> console.log(`Did NOT connect ${err}`));