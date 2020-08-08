import driver from '../../database'
import queries from './clothing.queries'
import { int } from 'neo4j-driver'


const getStack = async function (filter, { emailParam }) {
    try {
        const session = driver.session()
        const tx = session.beginTransaction()
        const stack = await tx.run(queries.stack(filter), {
            emailParam,
        })
        const populars = await tx.run(queries.populars(filter), {
            emailParam,
        })
        const random = await tx.run(queries.random(filter))
        session.close()
        return [
            ...stack.records.map((record: any) => record._fields[0].properties),
            ...populars.records.map((record: any) => record._fields[0].properties),
            ...random.records.map((record: any) => record._fields[0].properties),
        ]
    } catch (err) {
        console.error(err)
        return null
    }
}

// const getStack = async function (filter, { emailParam }) {
//     try {
//         const session = driver.session()
//         console.log("FILTER", filter)
//         const result = await session.run(queries.stack(filter), {
//             emailParam,
//         })
//         session.close()
//         return result.records.map((record: any) => record._fields[0].properties)
//     } catch (err) {
//         console.error(err)
//         return null
//     }
// }
const getPopulars = async function (filter, { emailParam }) {
    try {
        const session = driver.session()
        const result = await session.run(queries.populars(filter), {
            emailParam,
        })
        session.close()
        return result.records.map((record: any) => record._fields[0].properties)
    } catch (err) {
        console.error(err)
        return null
    }
}
const getRandom = async function (filter) {
    try {
        const session = driver.session()
        const result = await session.run(queries.random(filter))
        session.close()
        return result.records.map((record: any) => record._fields[0].properties)
    } catch (err) {
        console.error(err)
        return null
    }
}
const getHistorial = async function (type, { emailParam, page }) {
    let query
    switch (type) {
        case 'historicalAsc':
            query = queries.historicalAsc
            break
        case 'ratingAsc':
            query = queries.ratingAsc
            break
        case 'ratingDesc':
            query = queries.ratingDesc
            break
        default:
            query = queries.historicalDesc
            break
    }

    try {
        const session = driver.session()
        const result = await session.run(query, {
            emailParam,
            pageParam: int(page * 40),
        })
        session.close()
        return result.records.map((record: any) => record._fields[0].properties)
    } catch (err) {
        console.error(err)
        return null
    }
}
const getFavorites = async function ({ emailParam, page }) {
    try {
        const session = driver.session()
        const result = await session.run(queries.favorites, {
            emailParam,
            pageParam: int(page * 40),
        })
        session.close()
        return result.records.map((record: any) => record._fields[0].properties)
    } catch (err) {
        console.error(err)
        return null
    }
}
const getFavProduct = async function ({ emailParam, clothing }) {
    try {
        const session = driver.session()
        const result = await session.run(queries.getFavProduct, {
            emailParam,
            clothingParam: clothing
        })
        session.close()
        return result.records.map((record: any) => record._fields[0].properties)
    } catch (err) {
        console.error(err)
        return null
    }
}
const getBought = async function ({ emailParam, page }) {
    try {
        const session = driver.session()
        const result = await session.run(queries.bought, {
            emailParam,
            pageParam: int(page * 40),
        })
        session.close()
        return result.records.map((record: any) => record._fields[0].properties)
    } catch (err) {
        console.error(err)
        return null
    }
}

export default {
    getStack,
    getPopulars,
    getFavProduct,
    getHistorial,
    getFavorites,
    getBought,
    getRandom,
}
