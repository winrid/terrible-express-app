function load(name) {
    try {
        global[name] = require(name);
    } catch(e) {
        global[name] = require(require('path').join(__dirname, '..', name));
    }
}

module.exports = {load};
