import * as Hapi from '@hapi/hapi'
import { ServerRoute } from '@hapi/hapi'
import { validateBasic, validateJwt } from './auth/validate'
import UserController from './user/user.controller'
import ClothingController from './clothing/clothing.controller'
import AuthController from './auth/auth.controller'
import * as dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/.env' })

const server = Hapi.server({
    port: process.env.PORT || 3010,
    app: {},
})

const init = async () => {
    try {
        await server.register({
            plugin: require('hapi-cors'),
            options: {
                origins: ['http://localhost:8080', 'https://pickalook.co'],
                headers: ['Accept', 'Content-Type', 'Authorization', 'Country'],
            },
        })
        await server.register(require('@hapi/bell'))
        await server.register(require('hapi-auth-jwt2'))
        await server.register(require('@hapi/basic'))

        server.auth.strategy('jwt', 'jwt', {
            key: process.env.SECRET_KEY,
            validate: validateJwt,
        })

        server.auth.strategy('google', 'bell', {
            provider: 'google',
            password: 'cookie_encryption_password_secure',
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            isSecure: false,
            location: server.info.uri
        })

        server.auth.strategy('simple', 'basic', { validate: validateBasic })
        server.auth.default('simple')
        server.route([
            ...UserController,
            ...ClothingController,
            ...AuthController,
        ] as Array<ServerRoute>)

        await server.start()
        console.log(`Servidor corriendo en: ${server.info.uri}`)
    } catch (error) {
        console.log('Error al iniciar el servidor Hapi')
        console.error(error)
    }
}

init()

module.exports = server
