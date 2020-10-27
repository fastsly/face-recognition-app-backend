const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.status(200).json(user[0]);
      } else {
        res.status(400).json("User not found");
      }
    })
    .catch((err) => res.status(400).json("An unknown error has occured!"));
};

module.exports = {
    handleProfile: handleProfile
}