const otpGenerator = require("otp-generator")

const generateOTP = () => {
    return otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })
}

module.exports = generateOTP;