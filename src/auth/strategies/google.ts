
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import signin from '../validate.database'
import db from '../../user/database/user.database'
import * as Boom from 'boom'

exports.plugin = {
  name: 'google',
  register: function (server, options) {
    server.auth.scheme('google', function (server, options) {
      return {
        authenticate: async (request, h) => {

          try {
            const ticket = await client.verifyIdToken({
              idToken: request.headers.authorization.split(" ")[1],
              audience: process.env.GOOGLE_CLIENT_ID,

            })

            const payload = ticket.getPayload();
            const googlePayload = payload['email'];
            const user = await signin(googlePayload)
            if (!!user) {
              return h.authenticated({ credentials: user, artifacts: {} })
            }
            else {
              const newuser = await db.signup({
                emailParam: payload['email'],
                passParam: Math.random().toString(36).replace(/[^a-z]+/g, ''),
              })
              console.log("Newuser", newuser)
              return h.authenticated({ credentials: newuser, artifacts: {} })
            }

          }
          catch (error) {
            console.error("Auth Error", error)
            throw Boom.unauthorized(null, 'Custom');
          }
        }
      }

    });
  }
}