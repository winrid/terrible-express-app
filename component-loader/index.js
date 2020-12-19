function load(name) {
    try {
        return global[name] = require(name);
    } catch(e) {
        return global[name] = require(require('path').join(__dirname, '..', name));
    }
}

module.exports = {load};
