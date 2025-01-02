import jwt from "jsonwebtoken";

// Middleware untuk memverifikasi akses token
export const verifyToken = async (req, res, next) => {
    // Ambil token dari header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Jika token tidak ditemukan
    if (!token) {
        console.log("Token tidak ditemukan");
        return res.status(401).json({ message: "Unauthorized: Token tidak ditemukan" });
    }

    try {
        // Verifikasi token menggunakan secret
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Menyimpan informasi pengguna (email) pada req
        req.email = decoded.email;

        // Melanjutkan ke middleware berikutnya
        next();
    } catch (err) {
        console.log("Token tidak valid", err);
        return res.status(403).json({ message: "Forbidden: Token tidak valid" });
    }
};
