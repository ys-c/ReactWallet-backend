const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) => {
   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

}

exports.generateRefreshToken = (user) => {
   return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20m" })
}

exports.verifyToken = async (req) => {
   try {
      return new Promise((resolve, reject) => {
         // get token from request header
         const authHeader = req.headers["authorization"];
         const token = authHeader.split(" ")[1]; //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
         if (token === null) {
            throw new Error("Token not present");
         }
         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
               reject(new Error(err));
            }
            else {
               resolve(user);
               console.log("user:", user);
            }
         })
      });


   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}