import driver from '../../database'
import queries from './user.queries'

const signup = async ({ emailParam, passParam }) => {
    try {
        const session = driver.session()
        await session.run(queries.signup, { emailParam, passParam })
        session.close()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

const signupWithoutVerification = async ({ emailParam, passParam }) => {
    try {
        const session = driver.session()
        await session.run(queries.signupWithoutVerification, {
            emailParam,
            passParam,
        })
        session.close()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

const verify = async ({ emailParam }) => {
    try {
        const session = driver.session()
        await session.run(queries.verifyAccount, {
            emailParam,
        })
        session.close()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

const recover = async ({ emailParam, passParam }) => {
    try {
        const session = driver.session()
        await session.run(queries.recover, {
            emailParam,
            passParam,
        })
        session.close()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

const vote = async ({ emailParam, clothingParam, ratingParam }) => {
    try {
        const session = driver.session()
        await session.run(queries.vote, {
            emailParam,
            clothingParam,
            ratingParam,
        })
        session.close()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

const updateFilters = async ({ emailParam, filtersParam }) => {
    try {
        const session = driver.session()
        await session.run(queries.updateFilters, { emailParam, filtersParam })
        session.close()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}
const updateGenre = async ({ emailParam, genreParam }) => {
    try {
        const session = driver.session()
        await session.run(queries.updateGenre, { emailParam, genreParam })
        session.close()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}
const favorite = async ({ emailParam, clothingParam }) => {
    try {
        const session = driver.session()
        await session.run(queries.favorite, { emailParam, clothingParam })
        session.close()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}
const unfavorite = async ({ emailParam, clothingParam }) => {
    try {
        const session = driver.session()
        await session.run(queries.unfavorite, { emailParam, clothingParam })
        session.close()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}
const buy = async ({ emailParam, clothingParam }) => {
    try {
        const session = driver.session()
        await session.run(queries.buy, { emailParam, clothingParam })
        session.close()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export default {
    signup,
    signupWithoutVerification,
    verify,
    recover,
    vote,
    updateFilters,
    updateGenre,
    favorite,
    unfavorite,
    buy,
}
