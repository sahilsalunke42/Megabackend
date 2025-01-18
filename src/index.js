import dotenv from 'dotenv'
import connect from "./db/index.js";
 


dotenv.config({
    path: './env'
})


connect();



















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