"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vote = "MATCH (u: User{ email: $emailParam })\n              MATCH (c: Clothing{ code: $clothingParam })\n              CREATE (u)-[r:LIKES {rating: $ratingParam}]->(c)";
var signup = 'CREATE(u:User {email: $emailParam, password: $passParam, genre: "all", filters: []}) RETURN u.email';
var updateFilters = "MATCH (u: User{ email: $emailParam })\n        SET u.filters = $filtersParam";
var updateGenre = "MATCH (u: User{ email: $emailParam })\n        SET u.genre = $genreParam";
var favorite = "MATCH (u: User{ email: $emailParam })\n              MATCH (c: Clothing{ code: $clothingParam })\n              CREATE (u)-[r:FAVORITE]->(c)";
var unfavorite = "MATCH (u: User{ email: $emailParam })-[r:FAVORITE]->(c: Clothing{ code: $clothingParam })\n              DETACH DELETE r";
var buy = "MATCH (u: User{ email: $emailParam })\n              MATCH (c: Clothing{ code: $clothingParam })\n              MATCH (u)-[del:BUY]->(c)\n              DETACH DELETE del\n              CREATE (u)-[r:BUY]->(c)";
exports.default = {
    signup: signup,
    vote: vote,
    updateFilters: updateFilters,
    updateGenre: updateGenre,
    favorite: favorite,
    unfavorite: unfavorite,
    buy: buy,
};
//# sourceMappingURL=user.queries.js.map