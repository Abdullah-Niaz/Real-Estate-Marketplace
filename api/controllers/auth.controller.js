import User from "../models/user.model";

export const singup = async (req, res) => {
    // console.log(req.body)
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json("User Created Successfully");
}