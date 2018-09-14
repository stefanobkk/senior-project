const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{3,30}$')
      )
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      if ((error.details[0].context.key) === 'email') {
        res.status(400).send({
          error: 'You must enter a valid email address'
        })
      } else if ((error.details[0].context.key) === 'password') {
        res.status(400).send({
          error: 'Password must have length 3-30 and ....'
        })
      } else {
        res.status(400).send({
          error: 'Invalid registration info please try again..'
        })
      }
    } else {
      next()
    }
  }
}
