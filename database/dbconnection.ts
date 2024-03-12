import mongoose from "mongoose"

const dbConnection = async ():Promise<void> => {

    try {
       await mongoose.connect(process.env.MONGODB_ATLAS || "")
       console.log("Database online")
    } catch (error) {
        console.log(error)
        throw new Error("Database error")    
    }
}

export {
    dbConnection
}
