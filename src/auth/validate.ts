import signin from './validate.database'
import { ResponseToolkit, Request } from '@hapi/hapi'
import { compare } from 'bcrypt'

export const validateJwt = async (
    { email },
    request: Request,
    h: ResponseToolkit
) => {
    console.log('JWT Auth', email)
    const user = await signin(email)
    console.log(user)

    if (user) {
        return {
            isValid: true,
            credentials: user
        }
    }
    else {
        return {
            isValid: false,
        }
    }

}

export const validateGoogle = async (
    { email },
    request: Request,
    h: ResponseToolkit
) => {
    console.log('Google Auth', email)
    const user = await signin(email)
    if (!user) {
        return {
            isValid: false,
        }
    } else {
        return {
            isValid: true,
        }
    }
}

export const validateBasic = async (
    request: Request,
    username: string,
    password: string,
    h: ResponseToolkit
) => {
    console.log('Basic AUTH')
    const user = await signin(username)
    if (!user) {
        return { credentials: null, isValid: false }
    }

    const isValid = await compare(password, user.password)
    delete user.password

    return { isValid, credentials: user }
}
