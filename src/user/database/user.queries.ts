const vote = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ code: $clothingParam })
              CREATE (u)-[r:LIKES {rating: $ratingParam}]->(c)`

const signup =
    'CREATE(u:User {email: $emailParam, password: $passParam, genre: "all", filters: [], confirmed: true}) RETURN u.email'

const signupWithoutVerification =
    'CREATE(u:User {email: $emailParam, password: $passParam, genre: "all", filters: [], confirmed: false}) RETURN u.email'

const verifyAccount = `MATCH (u: User{ email: $emailParam })
        SET u.confirmed = true`

const recover = `MATCH (u: User{ email: $emailParam })
        SET u.password = $passParam`

const updateFilters = `MATCH (u: User{ email: $emailParam })
        SET u.filters = $filtersParam`

const updateGenre = `MATCH (u: User{ email: $emailParam })
        SET u.genre = $genreParam`

const favorite = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ code: $clothingParam })
              CREATE (u)-[r:FAVORITE]->(c)`

const unfavorite = `MATCH (u: User{ email: $emailParam })-[r:FAVORITE]->(c: Clothing{ code: $clothingParam })
              DETACH DELETE r`

const buy = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ code: $clothingParam })
              MATCH (u)-[del:BUY]->(c)
              DETACH DELETE del
              CREATE (u)-[r:BUY]->(c)`

export default {
    signup,
    signupWithoutVerification,
    verifyAccount,
    recover,
    vote,
    updateFilters,
    updateGenre,
    favorite,
    unfavorite,
    buy,
}
