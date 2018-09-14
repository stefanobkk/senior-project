const response = require('./controller/loginController')
const loginpolicy = require('./controller/loginPolicy')

// module.exports = (app) => {
//   app.post('/register', response.register)
// }
module.exports = (app) => {
  app.post('/register', loginpolicy.register, response.register)
}
