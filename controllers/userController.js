const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretkey = "sandeepsundarlenka";

exports.signup = async (req, res, next) => {
    try {
        const { name, email,phone, password } = req.body;

        const existingUser = await Users.findOne({ where: { email: email } });

        if (existingUser) {
            return res.status(400).json({ error: "Email already registered. Please login" });
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const data = await Users.create({
            name: name,
            email: email,
            phone:phone,
            password: hash
        });

        res.json({ dataValues: data });
    } catch (err) {
        res.status(500).json({ error: "Failed to sign up" });
    }
};