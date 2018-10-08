const { User } = require('../models')
const { Api } = require('../models')

module.exports = {
  async registers (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: `The email account has already been regisred please use another email address`
      })
    }
  },

  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'Login information was incorrect.'
        })
      }
      const isPasswordValid = await password === user.password
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Password was incorrect.'
        })
      }
      res.send({
        user: user.toJSON()
      })
    } catch (err) {
      res.status(500).send({
        error: `Bad Login`
      })
    }
  },
  async apiKey (req, res) {
    try {
      const userApi = await Api.create(req.body)
      res.send({
        something: userApi.toJSON()
      })
    } catch (err) {
      res.status(400).send({
        error: `The API key is invalid or something`
      })
    }
  }
}
