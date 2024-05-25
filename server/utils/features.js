import mongoose from "mongoose"

const connectDB = (uri) => {
    mongoose
        .connect(uri, { dbName: "mychat" })
        .then((data) => console.log(`Connected to DB: ${data}`))
        .catch((err) => {
            throw err;
        });
}

export { connectDB };