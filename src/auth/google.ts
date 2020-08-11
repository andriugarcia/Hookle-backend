const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default (token) => {
  try {
    client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend

    }).then((ticket) => {
      const payload = ticket.getPayload();
      const googlePayload = payload['email'];
      return googlePayload
    })

  }
  catch (_) {
    throw new Error('El token de Google es invalido')
  }
}