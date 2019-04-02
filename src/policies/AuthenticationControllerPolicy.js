const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'u have to provide a validate email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `the passwrod provide failed to match the following rules:
            <br>
            1.lower and upper case numeric
            <br>
            2. at least 8 max 32 characters
            `
          })
          break
        default:
          res.status(400).send({
            error: 'inwalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
