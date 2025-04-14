import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access denied, token missing" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });

        //console.log("Decoded User:", user);
        req.user = user; 
        next();
    });
};


export { authenticateToken};
