const errTip = msg => ({ msg, status: 500, data: null })
const successTip = (msg, data = null) => ({ msg, status: 200, data })
module.exports = {
  errTip,
  successTip,
}
