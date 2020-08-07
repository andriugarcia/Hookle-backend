"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vote = "MATCH (u: User{ email: $emailParam })\n              MATCH (c: Clothing{ code: $clothingParam })\n              CREATE (u)-[r:LIKES {rating: $ratingParam}]->(c)";
var signup = 'CREATE(u:User {email: $emailParam, password: $passParam, genre: "all", filters: [], confirmed: true}) RETURN u.email';
var signupWithoutVerification = 'CREATE(u:User {email: $emailParam, password: $passParam, genre: "all", filters: [], confirmed: false}) RETURN u.email';
var verifyAccount = "MATCH (u: User{ email: $emailParam })\n        SET u.confirmed = true";
var recover = "MATCH (u: User{ email: $emailParam })\n        SET u.password = $passParam";
var updateFilters = "MATCH (u: User{ email: $emailParam })\n        SET u.filters = $filtersParam";
var updateGenre = "MATCH (u: User{ email: $emailParam })\n        SET u.genre = $genreParam";
var favorite = "MATCH (u: User{ email: $emailParam })\n              MATCH (c: Clothing{ code: $clothingParam })\n              CREATE (u)-[r:FAVORITE]->(c)";
var unfavorite = "MATCH (u: User{ email: $emailParam })-[r:FAVORITE]->(c: Clothing{ code: $clothingParam })\n              DETACH DELETE r";
var buy = "MATCH (u: User{ email: $emailParam })\n              MATCH (c: Clothing{ code: $clothingParam })\n              MATCH (u)-[del:BUY]->(c)\n              DETACH DELETE del\n              CREATE (u)-[r:BUY]->(c)";
exports.default = {
    signup: signup,
    signupWithoutVerification: signupWithoutVerification,
    verifyAccount: verifyAccount,
    recover: recover,
    vote: vote,
    updateFilters: updateFilters,
    updateGenre: updateGenre,
    favorite: favorite,
    unfavorite: unfavorite,
    buy: buy,
};
//# sourceMappingURL=user.queries.js.map