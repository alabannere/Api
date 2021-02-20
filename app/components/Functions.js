const bcrypt = require("bcrypt");
var uuid = require('uuid');

module.exports = {

    async HashCompare(password, password2) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const valid = await bcrypt.compare(password2, hash);
        return valid;

    },



    async HashCreate(password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log("password convertido en hash, esto iria en la parte cliente ", hash);
        return hash;
    },


    ApiKeyIs(apiKey) {
        if (apiKey === "Auth: 123") {
            return true;
        } else {
            return false;
        }
    },

    UID() {
        return uuid.v1();

    }

};
