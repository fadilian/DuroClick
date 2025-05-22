import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { name, email, gender, telp, address, password } = req.body;

        // Cek apakah email sudah terdaftar
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ msg: "Email already registered" });

        // Buat user baru
        await User.create({ name, email, gender, telp, address, password });
        res.status(201).json({ msg: "Registration successful" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Bandingkan password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ msg: "Invalid email or password" });

        res.status(200).json({
            msg: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                level: user.level
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};
