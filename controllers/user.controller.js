const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userValidations } = require("../validators/user.validators");

//Create
exports.createUser = async (req, res) => {
    try {
        const payload = req.body;
        const { error } = userValidations.validate(payload)

        if (error) {
            return res.status(500).json({
                message: "wrong validations",
                errors: error
            })
        }

        var salt = await bcrypt.genSalt(10);
        var hashedPassword = bcrypt.hashSync(payload.password, salt);
        payload.password = hashedPassword;
        const user = await userModel.create(payload)
        return res.status(200).send({
            succes: true,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            succes: false,
            message: "interanal server error"
        })
    }
}

//Read
exports.getUser = async (req, res) => {
    try {
        const user = await userModel.find(req.body)
        return res.status(200).send({
            succes: true,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            succes: false,
            message: "interanal server error"
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        console.log(req)
        console.log(req.body)
        const email = req.body.email;
        const password = req.body.password;


        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                message: "User not found!!"
            })
        }

        console.log(password, user.password);

        if (await bcrypt.compare(password, user.password)) {

            const accessToken = jwt.sign({ user: user }, process.env.SECRET_TOKEN, { expiresIn: "12h" });
            //console.log("token",accessToken)
            return res.status(200).json({
                data: accessToken,
            })
        }

        return res.status(400).json({
            message: "email or password don't match! try again."
        })
    } catch (error) {
        console.log(error);
    }
}

//update

exports.updateUser = async (req, res) => {
    try {
        let updtUser = await userModel.findById(req.params.id)

        if (!updtUser) {
            return res.status(200).json({ status: false, message: "Please provide correct id" })
        }
        updtUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            updtUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "data not found" })
    }
}

//Delete
exports.deleteUser = async (req, res) => {
    let dltUser = await userModel.findById(req.params.id);

    if (!dltUser) {
        return res.status(200).json({ status: false, message: "Please provide correct id" })
    }

    product = await userModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Deleted Successfully"
    });
};