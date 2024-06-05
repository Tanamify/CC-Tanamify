// Middleware untuk menetapkan req.userId berdasarkan token JWT yang valid
const authenticateToken = (req, res, next) => {
  // Mendapatkan token dari header permintaan
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Jika token tidak tersedia, kembalikan respons 401 Unauthorized
  if (token == null) return res.sendStatus(401);

  // Verifikasi token JWT
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Jika token tidak valid, kembalikan respons 403 Forbidden
    if (err) return res.sendStatus(403);

    // Jika token valid, tetapkan req.userId dengan id pengguna dari token
    req.userId = user.id;
    next();
  });
};
