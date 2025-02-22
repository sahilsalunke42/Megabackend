import dotenv from 'dotenv'
import connect from "./db/index.js";
import { app } from './app.js';
 
dotenv.config({
    path: './env'
})


connect()
.then(() =>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`app is running on server ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!!", err); 
})




















// (async () => {
//     try {
//         await mongoose.connect(`process.env.${MONGOBD_URI}/${DB_NAME}`);
//         app.on("error", () => {
//             console.log("ERROR: ", error);
//             throw error;
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`The app is running on ${process.env.PORT}`);     
//         })

//     } catch (error) {
//       console.error("ERROR: ", error)
//       throw error;  
//     }
// })()