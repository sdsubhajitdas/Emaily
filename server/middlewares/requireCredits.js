module.exports = (req, res, next) => {
  const { credits } = req.user;
  if (credits < 1) {
    return res.status(403).send({ error: "Not enough credits" });
  }
  next();
};
