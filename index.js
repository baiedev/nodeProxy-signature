var authorizeBeta = require('./beta')
var authorizeRel = require('./release')
var authorizeProd = require('./production')

module.exports = function getAuthorize(env) {
    console.log('fetch sign env:', env)
    var authorize = authorizeProd
    if (['rel', 'release'].includes(env)) {
        authorize = authorizeRel
    }else if (['beta'].includes(env)) {
        authorize = authorizeBeta
    }
    return authorize
}
