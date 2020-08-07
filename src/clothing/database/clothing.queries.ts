const stack = (
    filter
) => `MATCH (u1:User {email: $emailParam})-[x:LIKES]->(clothing:Clothing)
                                WITH u1, gds.alpha.similarity.asVector(clothing, x.rating) AS u1Vector
                                MATCH (u2:User)-[x2:LIKES]->(clothing:Clothing) WHERE u2 <> u1

                                WITH u1, u2, u1Vector, gds.alpha.similarity.asVector(clothing, x2.rating) AS u2Vector

                                WITH u1, u2,  gds.alpha.similarity.pearson(u1Vector, u2Vector, {vectorType: "maps"}) AS similarity
                                ORDER BY similarity DESC
                                LIMIT 10

                                MATCH (u2)-[r:LIKES]->(c:Clothing) WHERE NOT EXISTS( (u1)-[:LIKES]->(c) ) ${filter}
                                RETURN c, SUM( similarity * r.rating) AS score
                                ORDER BY score DESC LIMIT 25`

const populars = (filter) => `MATCH (a:User)-[r:LIKES]->(c:Clothing)
                        WHERE NOT (:User {email: $emailParam})-[]->(c) ${filter}
                        WITH c, COLLECT(r.rating) as likes
                        UNWIND likes AS likesret
                        RETURN c, AVG(likesret) AS len
                        ORDER BY len DESC LIMIT 10`

const random = (filter) => `MATCH   (c:Clothing)
                WHERE NOT (c)<-[]-() ${filter}
                WITH c, rand() AS number
                RETURN c
                ORDER BY number
                LIMIT 5`

const historicalAsc = `MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)
                    RETURN c ORDER BY r ASC  SKIP $pageParam LIMIT 40`
const historicalDesc = `MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)
                    RETURN c ORDER BY r DESC  SKIP $pageParam LIMIT 40`
const ratingAsc = `MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)
                    RETURN c ORDER BY r.rating ASC  SKIP $pageParam LIMIT 40`
const ratingDesc = `MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)
                    RETURN c ORDER BY r.rating DESC  SKIP $pageParam LIMIT 40`
const favorites = `MATCH (n:User {email: $emailParam})-[r:FAVORITE]->(c)
              RETURN c SKIP $pageParam LIMIT 40`
const bought = `MATCH (n:User {email: $emailParam})-[r:BUY]->(c)
              RETURN c SKIP $pageParam LIMIT 40`

export default {
    stack,
    populars,
    random,
    historicalAsc,
    historicalDesc,
    ratingAsc,
    ratingDesc,
    favorites,
    bought,
}
