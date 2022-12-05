const path = require("path");
const { aliasWebpack, aliasJest } = require('react-app-alias')

const options = {} // default is empty for most cases

//module.exports = aliasWebpack(options)
module.exports = function override(config) {
    const pathSrc = config.module.rules[1].oneOf[3].include;
    config.module.rules[1].oneOf[3].include = [
        path.dirname(path.dirname(pathSrc), "shareds"),
        path.join(pathSrc)
    ]
    return aliasWebpack(options)(config);
}
module.exports.jest = aliasJest(options)