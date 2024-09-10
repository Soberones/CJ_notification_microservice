const SECRET_KEY = process.env.SECRET_KEY;

function checkSecretKey(req, res, next) {
  const secretKey = req.headers["x-secret-key"];

  if (secretKey && secretKey === SECRET_KEY) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden: Invalid or missing secret key" });
  }
}

module.exports = checkSecretKey;
