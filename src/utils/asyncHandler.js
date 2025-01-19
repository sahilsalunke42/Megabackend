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

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn (req, res, next);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
         });
    }
}

export { asyncHandler };