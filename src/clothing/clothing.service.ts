import filterQuery from '../services/filterQuery'
import db from './database/clothing.database'
import Boom = require('boom')

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

const getStack = async function ({ auth, payload }: any, h) {
    try {
        const filter = filterQuery(
            auth.credentials.filters,
            auth.credentials.genre
        )
        const result = await db.getStack(filter, {
            emailParam: auth.credentials.email,
        })

        let nodes = result.filter(
            (v, i, a) => a.findIndex((t) => t.code === v.code) === i
        )

        return shuffle(nodes)
    } catch (err) {
        console.error(err)
        return null
    }
}
const getPopulars = async function ({ auth, payload }: any, h) {
    try {
        const filter = filterQuery(
            auth.credentials.filters,
            auth.credentials.genre
        )
        let result = await db.getPopulars(filter, {
            emailParam: auth.credentials.email,
        })
        return result
    } catch (err) {
        console.error(err)
        throw Boom.badData('Error al obtener populares')
    }
}
const getHistorial = async function ({ auth, payload, params }: any, h) {
    try {
        let result = await db.getHistorial(params.page, {
            emailParam: auth.credentials.email,
            page: params.page,
        })

        return result
    } catch (err) {
        console.error(err)
        throw Boom.badData('Error al obtener el historial')
    }
}
const getFavorites = async function ({ auth, params }: any, h) {
    try {
        let result = await db.getFavorites({
            emailParam: auth.credentials.email,
            page: params.page,
        })
        return result
    } catch (err) {
        console.error(err)
        throw Boom.badData('Error al obtener los favoritos')
    }
}
const getBought = async function ({ auth, payload, params }: any, h) {
    try {
        let result = await db.getBought({
            emailParam: auth.credentials.email,
            page: params.page,
        })
        return result
    } catch (err) {
        console.error(err)
        throw Boom.badData('Error al obtener los comprados')
    }
}

export default { getStack, getPopulars, getHistorial, getFavorites, getBought }