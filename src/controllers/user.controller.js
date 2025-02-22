import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiErrors.js";
import { User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const{fullName, email, password,username} = req.body
    console.log("email: ", email);

    if (
        [fullName,email,username,password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields required")
    };
    
    const existingUser = User.findOne({
        $or: [{ username }, { email}]
    })

    if (existingUser) {
        throw new ApiError(409, "user with this email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log(avatarLocalPath);
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    console.log(coverImageLocalPath);
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user!")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

} );

export { registerUser } 



    // get user details from frontend
    //validation- not empty
    //check if user already existd: username, email
    //check for images check for avatar
    //upload them to cloudinary, avatat
    //user object creation - create entry in db
    //remove pass and refresh token field from response
    //check for user creation
    // return response