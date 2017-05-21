const sharp = require('sharp')

const User = require('../../models/User')

const post = (req, res) => {
  sharp(req.file.buffer)
    .resize(512, 512)
    .max()
    .withoutEnlargement()
    .toFile(`assets/profile/${req.userId}.jpg`)
    .then(async () => {
      await User.findByIdAndUpdate(req.userId, {
        hasProfilePhoto: true
      })
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  post
}
