const sharp = require('sharp')

const post = (req, res) => {
  sharp(req.file.buffer)
    .resize(512, 512)
    .max()
    .withoutEnlargement()
    .toFile(`assets/profile/${req.userId}.jpg`)
    .then(() => console.log('ok'))

  res.sendStatus(201)
}

module.exports = {
  post
}
