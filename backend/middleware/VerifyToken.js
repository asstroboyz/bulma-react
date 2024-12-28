import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized jika token tidak ditemukan
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Forbidden jika token tidak valid
        }

        req.email = decoded.email; // Simpan data decoded ke dalam req
        next(); // Lanjutkan ke middleware berikutnya
    });
};
