// import { request } from "express";

// const asyncHandler = (requesthandler) => {
//     (req, res, next) => {
//         Promise.resolve(requesthandler(req, res, next))
//         .catch((err) => {
//             console.log("ERROR: ", err);
//             next(err);
//         }
//     }
// }

const asyncHandler = (requesthandler) => {
    return (req,res,next) => {
        Promise.resolve(requesthandler(req,res,next)).catch((err) => (err))
    }
}

export { asyncHandler };
