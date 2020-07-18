'use strict'

const jwt=require('jwt-simple')
const moment=require('moment')
const config=require('../config')
const base64url = require('base64url');

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
            console.log("TOKEN: ", payload)
            if(payload.exp<=moment().unix()){
              reject({
                status:401,
                message: 'Token expirado'
              })
            }
            resolve(payload.sub)
            
        } catch (err) {
            var segments = token.split('.');
            let googlePayload = JSON.parse(base64url.decode(segments[1]));
            console.log("GOOGLE TOKEN", googlePayload);
            if (typeof googlePayload.email !== 'undefined') {
                resolve(googlePayload.email)
            }
            else {
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