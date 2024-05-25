import { User } from "../models/user.model.js";

// Create a user and save it to database and save the cookies
const newUser = async (req, res) => {

    const { name, username, password, bio } = req.body;

    console.log(req.body);

    const avatar = {
        public_id: 'shjnjdj',
        url: 'akks',
    };

    await User.create({ name, username, password, bio, avatar });

    res.status(201).json({ message: "User created succesfully" });
};

const login = (req, res) => {
    res.send("Welcome user");
};

export { login, newUser };
