// import Users from "../models/UserModel.js";
// import jwt from "jsonwebtoken";

// export const refreshToken = async (req, res) => {
//     try {
//        const refreshToken = req.cookies.refreshToken;
//         if (!refreshToken) return res.sendStatus(401);
//        const user = await Users.findAll({ 
//         where: { 
//             refresh_token: refreshToken 
//         } 
//     });
//        if (!user[0]) return res.sendStatus(403);
//        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//         if (err)
//             return res.sendStatus(403); 
//             const userId = user[0].id;
//             const name = user[0].name;
//             const email = user[0].email;
//             const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: "20s" });
//                 res.json({ accessToken: accessToken });
        
//     });
      
//     } catch (error) {
//         console.error("Refresh Token", error);
//     }
// }
import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        // Cek apakah cookie `refreshToken` tersedia
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token tidak tersedia" });
        }

        // Cari user berdasarkan refresh token
        const user = await Users.findOne({ where: { refresh_token: refreshToken } });

        // Jika user tidak ditemukan
        if (!user) {
            return res.status(403).json({ message: "Refresh token tidak valid" });
        }

        // Verifikasi refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Refresh token tidak valid" });
            }

            // Buat access token baru
            const userId = user.id;
            const name = user.name;
            const email = user.email;

            const accessToken = jwt.sign(
                { userId, name, email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "20m" } // Sesuaikan waktu kadaluwarsa
            );

            // Kirim access token ke klien
            res.json({ accessToken });

            
        });
    } catch (error) {
        console.error("Error dalam refresh token:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

// import Users from "../models/UserModel.js";
// import jwt from "jsonwebtoken";

// export const refreshToken = async (req, res) => {
//     try {
//         const refreshToken = req.cookies.refreshToken;

//         // Cek apakah cookie `refreshToken` tersedia
//         if (!refreshToken) {
//             return res.status(401).json({ message: "Refresh token tidak tersedia" });
//         }

//         // Cari user berdasarkan refresh token
//         const user = await Users.findOne({ where: { refresh_token: refreshToken } });

//         // Jika user tidak ditemukan
//         if (!user) {
//             return res.status(403).json({ message: "Refresh token tidak valid" });
//         }

//         // Verifikasi refresh token
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 return res.status(403).json({ message: "Refresh token tidak valid" });
//             }

//             // Buat access token baru
//             const userId = user.id;
//             const name = user.name;
//             const email = user.email;

//             const accessToken = jwt.sign(
//                 { userId, name, email },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: "20m" } // Sesuaikan waktu kadaluwarsa
//             );

//             // Kirim access token ke klien
//             res.json({ accessToken });
//         });
//     } catch (error) {
//         console.error("Error dalam refresh token:", error);
//         res.status(500).json({ message: "Terjadi kesalahan pada server" });
//     }
// };
