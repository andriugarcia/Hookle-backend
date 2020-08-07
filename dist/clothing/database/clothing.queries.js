"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stack = function (filter) { return "MATCH (u1:User {email: $emailParam})-[x:LIKES]->(clothing:Clothing)\n                                WITH u1, gds.alpha.similarity.asVector(clothing, x.rating) AS u1Vector\n                                MATCH (u2:User)-[x2:LIKES]->(clothing:Clothing) WHERE u2 <> u1\n\n                                WITH u1, u2, u1Vector, gds.alpha.similarity.asVector(clothing, x2.rating) AS u2Vector\n\n                                WITH u1, u2,  gds.alpha.similarity.pearson(u1Vector, u2Vector, {vectorType: \"maps\"}) AS similarity\n                                ORDER BY similarity DESC\n                                LIMIT 10\n\n                                MATCH (u2)-[r:LIKES]->(c:Clothing) WHERE NOT EXISTS( (u1)-[:LIKES]->(c) ) " + filter + "\n                                RETURN c, SUM( similarity * r.rating) AS score\n                                ORDER BY score DESC LIMIT 25"; };
var populars = function (filter) { return "MATCH (a:User)-[r:LIKES]->(c:Clothing)\n                        WHERE NOT (:User {email: $emailParam})-[]->(c) " + filter + "\n                        WITH c, COLLECT(r.rating) as likes\n                        UNWIND likes AS likesret\n                        RETURN c, AVG(likesret) AS len\n                        ORDER BY len DESC LIMIT 10"; };
var random = function (filter) { return "MATCH   (c:Clothing)\n                WHERE NOT (c)<-[]-() " + filter + "\n                WITH c, rand() AS number\n                RETURN c\n                ORDER BY number\n                LIMIT 5"; };
var historicalAsc = "MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)\n                    RETURN c ORDER BY r ASC  SKIP $pageParam LIMIT 40";
var historicalDesc = "MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)\n                    RETURN c ORDER BY r DESC  SKIP $pageParam LIMIT 40";
var ratingAsc = "MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)\n                    RETURN c ORDER BY r.rating ASC  SKIP $pageParam LIMIT 40";
var ratingDesc = "MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)\n                    RETURN c ORDER BY r.rating DESC  SKIP $pageParam LIMIT 40";
var favorites = "MATCH (n:User {email: $emailParam})-[r:FAVORITE]->(c)\n              RETURN c SKIP $pageParam LIMIT 40";
var bought = "MATCH (n:User {email: $emailParam})-[r:BUY]->(c)\n              RETURN c SKIP $pageParam LIMIT 40";
exports.default = {
    stack: stack,
    populars: populars,
    random: random,
    historicalAsc: historicalAsc,
    historicalDesc: historicalDesc,
    ratingAsc: ratingAsc,
    ratingDesc: ratingDesc,
    favorites: favorites,
    bought: bought,
};
//# sourceMappingURL=clothing.queries.js.map