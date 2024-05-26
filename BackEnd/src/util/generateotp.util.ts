import otp from 'otp-generator'

const generateOtp = () => {
  return otp.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false
  })
}

export default generateOtp;
