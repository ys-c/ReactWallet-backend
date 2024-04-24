const User = require("../models/user");
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/jwt");

exports.createUser = async (req, res) => {
    try {
        // check if username exist
        const validateName = await User.findAll({ where: { username: req.body.username }, })
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log("validate name:", validateName);
        if (validateName.length === 0) {
            const tempUser = {
                userId: '',
                username: req.body.username,
                password: hashedPassword
            };
            User.create(tempUser).then(function (user) {
                res.status(200).json({ message: "success" });
            })
        }
        else {
            throw new Error('This username already exist');

        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        console.log(refreshTokenList);
        const userNameExist = await User.findOne({ where: { username: req.body.username }, })
        if (userNameExist === null) {
            throw new Error("User does not exist!");
        }
        else {
            // check if password enter by user is correct
            let passwordCheck = await bcrypt.compare(req.body.password, userNameExist.password);
            if (passwordCheck === true) {
                //generate tokens based on username
                const accessToken = generateAccessToken({ username: req.body.username });
                const refreshToken = generateRefreshToken({ username: req.body.username });
                // console.log("push in login");
                refreshTokenList.push(refreshToken);
                // console.log("refreshTokenList: ", refreshTokenList);
                res.json({ accessToken: accessToken, refreshToken: refreshToken })
            }
            else {
                throw new Error("Password Incorrect!");
            }
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

// refresh token . retire old token
exports.refreshAccessToken = async (req, res) => {
    try {
        // see if the current refresh token is in the token list
        let validateRefreshToken = refreshTokenList.includes(req.body.token);
        if (validateRefreshToken === false) {
            throw new Error("Invalid Refresh Token");
        }
        // valid token, remove the old valid token
        let indexToDel = refreshTokenList.indexOf(req.body.token);
        refreshTokenList.splice(indexToDel, 1);
        // generate new access and refresh token 
        const accessToken = generateAccessToken({ username: req.body.name })
        const refreshToken = generateRefreshToken({ username: req.body.name })
        // console.log("push in refresh");
        refreshTokenList.push(refreshToken);
        // console.log("refreshTokenList: ", refreshTokenList);
        res.json({ accessToken: accessToken, refreshToken: refreshToken })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.verifyUserAuth = async (req,res) =>{
    try{
        verifyToken(req)
        .then((user) => {
            console.log(user);
            res.status(200).json({ username: user.username});
          })
          .catch((err) => {
            res.status(403).json({ message: err.message });
          });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



exports.logout = async (req, res) => {
    try {
        // console.log("refreshTokenList: ", refreshTokenList);
        // see if the current refresh token is in the token list
        let validateRefreshToken = refreshTokenList.includes(req.body.token);
        if (validateRefreshToken === false) {
            throw new Error("Invalid Refresh Token");
        }
        // valid token, remove the old valid token
        let indexToDel = refreshTokenList.indexOf(req.body.token);
        refreshTokenList.splice(indexToDel, 1);
        res.status(200).send("logout successful");

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

