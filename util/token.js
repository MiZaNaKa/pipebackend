var speakeasy = require("speakeasy")

var secret = speakeasy.generateSecret({ length: 20 });
var encoding = 'base32'

class otpHelper {

    async generateOTP(email){
        var token = await speakeasy.totp({
            secret: secret.base32,
            encoding: encoding,
            window: 2
        });
        var request={
            token:token,
            secret:secret
        }
        console.log("OTP is " + token)
        return request
    }

    async verifyOTP(otp,secretKey){
        var isMatch = await speakeasy.totp.verify({
            secret: secretKey.base32,
            encoding: 'base32',
            token: otp,
            window: 10
          });
          return isMatch
    }
}


module.exports = new otpHelper()

