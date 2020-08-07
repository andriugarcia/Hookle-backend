import { sign } from 'jsonwebtoken'
import db from './database/user.database'
import signin from '../auth/validate.database'
import confirmationMail from '../mail/confirmation'
import recoverMail from '../mail/recover'
import * as bcrypt from 'bcrypt'
import * as Boom from 'boom'

const signup = async function ({ payload }: any, h) {
    const user = await signin(payload.email)
    if (!!user) {
        throw Boom.badData('Ya existe un usuario con este email')
    }
    await db.signupWithoutVerification({
        emailParam: payload.email,
        passParam: await bcrypt.hash(payload.password, 10),
    })
    await confirmationMail(
        payload.email,
        sign({ ...payload }, process.env.SECRET_KEY, { expiresIn: '1d' })
    )

    return {
        accessToken: sign({ ...payload }, process.env.SECRET_KEY, {
            expiresIn: '1d',
        }),
    }
}
const login = async function ({ auth: { credentials } }: any) {
    console.log(credentials)
    return {
        user: credentials,
        accessToken: sign({ ...credentials }, process.env.SECRET_KEY, {
            expiresIn: '1d',
        }),
    }
}
const verify = async function ({ auth: { credentials } }: any) {
    await db.verify({ emailParam: credentials.email })
    return 'OK'
}
const recover = async function ({ auth, payload }: any) {
    console.log(auth.credentials.email)
    await db.recover({
        emailParam: auth.credentials.email,
        passParam: await bcrypt.hash(payload.password, 10),
    })
    return 'OK'
}
const sendRecoverPassword = async function ({ payload }: any, h) {
    console.log('Email', payload.email)
    await recoverMail(
        payload.email,
        sign({ ...payload }, process.env.SECRET_KEY, { expiresIn: '1d' })
    )
    return 'OK'
}
const getMe = async function ({ auth }: any, h) {

    const { email, filters, genre, confirmed } = await signin(auth.credentials.email)
    return {
        email,
        filters,
        genre,
        confirmed,
    }
}
const vote = async function ({ auth, payload }: any) {
    if (
        await db.vote({
            emailParam: auth.credentials.email,
            clothingParam: payload.clothing,
            ratingParam: payload.rating,
        })
    ) {
        return 'OK'
    } else {
        throw Boom.badData('No se ha podido votar correctamente')
    }
}
const updateFilters = async function ({ auth, payload }: any, h) {
    if (
        await db.updateFilters({
            emailParam: auth.credentials.email,
            filtersParam: payload.filters,
        })
    ) {
        return 'OK'
    } else {
        throw Boom.badData('No se ha podido actualizar los filtros')
    }
}
const updateGenre = async function ({ auth, payload }: any, h) {
    if (
        await db.updateGenre({
            emailParam: auth.credentials.email,
            genreParam: payload.genre,
        })
    ) {
        return 'OK'
    } else {
        throw Boom.badData('No se ha podido actualizar el género')
    }
}
const fav = async function ({ auth, payload }: any, h) {
    if (
        await db.favorite({
            emailParam: auth.credentials.email,
            clothingParam: payload.clothing,
        })
    ) {
        return 'OK'
    } else {
        throw Boom.badData('No se ha podido guardar a favoritos')
    }
}
const unfav = async function ({ auth, payload }: any, h) {
    if (
        await db.unfavorite({
            emailParam: auth.credentials.email,
            clothingParam: payload.clothing,
        })
    ) {
        return 'OK'
    } else {
        throw Boom.badData('No se ha podido quitar de favoritos')
    }
}
const buy = async function ({ auth, payload }: any, h) {
    if (
        await db.buy({
            emailParam: auth.credentials.email,
            clothingParam: payload.clothing,
        })
    ) {
        return 'OK'
    } else {
        throw Boom.badData('No se ha podido comprar')
    }
}

export default {
    signup,
    login,
    verify,
    sendRecoverPassword,
    recover,
    getMe,
    vote,
    updateFilters,
    updateGenre,
    fav,
    unfav,
    buy,
}
