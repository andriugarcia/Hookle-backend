'use strict'

const jwt=require('jwt-simple')
const moment=require('moment')
const config=require('../config')
const base64url = require('base64url');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("774180793403-9h849s9h8it86b949hjb83e7gm722oop.apps.googleusercontent.com");



function createToken(user){
    const payload={
        sub: user.email,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
    const decoded=new Promise((resolve, reject)=>{
        try {
            const payload=jwt.decode(token, config.SECRET_TOKEN)
            if(payload.exp<=moment().unix()){
              reject({
                status:401,
                message: 'Token expirado'
              })
            }
            resolve(payload.sub)
            
        } catch (err) {
            try {
                client.verifyIdToken({
                    idToken: token,
                    audience: "774180793403-9h849s9h8it86b949hjb83e7gm722oop.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
    
                }).then((ticket) => {
                    const payload = ticket.getPayload();
                    const googlePayload = payload['email'];
                    resolve(googlePayload)
                })

            }
            catch(_) {
                reject({
                    status:500,
                    message: 'Token invalido'
                })
            }
        }
    })
    return decoded
}

module.exports={
    createToken,
    decodeToken
}