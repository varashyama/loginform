'use strict';

const jwt = require('jsonwebtoken');

const generateToken = (info) => {
    return jwt.sign({
        data : info,

    }, '17e7e65b-d32e-449a-a0fd-4efa1c12c96b', { expiresIn: 60 * 60 })

}

module.exports = {

    generate : generateToken,
} 