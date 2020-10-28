const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: "d2374cb5c0bc42abbeebc018f1f2a663",
});

const handleApiCall = (req,res) =>{
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input, { language: "en" })
        .then(data => res.json(data))
        .catch(err => res.status(400).json('error with api call'+err))
}

const handleImage = (req, res, db) =>{
    const { id } = req.body;
    db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
        res.status(200).json(entries[0]);
    })
    .catch((err) => {
        res.status(400).json("Unable to get entries");
    });
}

module.exports = {
    handleImage: handleImage,
    handelApiCall:handleApiCall
}