
const stack = `MATCH (u:User {email: $emailParam})-[:LIKES]->(lc:Clothing)<-[:LIKES]-(l)-[:LIKES]->(like)
              WHERE NOT (like)<-[]-(u)
              MATCH (u)-[:DISLIKES]->(dc:Clothing)<-[:DISLIKES]-(d)-[:LIKES]->(dislike)
              WHERE NOT (dislike)<-[]-(u)
              WITH [like, dislike] as results
              UNWIND results AS x
              UNWIND x AS y
              RETURN y, count(y) as frequency
              ORDER BY frequency DESC
              LIMIT 20`;

const stackRating = `MATCH (u1:User {email:$emailParam})-[r:LIKES]->(m:Clothing)
                    WITH u1, avg(r.rating) AS u1_mean

                    MATCH (u1)-[r1:LIKES]->(m:Clothing)<-[r2:LIKES]-(u2)
                    WITH u1, u1_mean, u2, COLLECT({r1: r1, r2: r2}) AS ratings

                    MATCH (u2)-[r:LIKES]->(m:Clothing)
                    WITH u1, u1_mean, u2, avg(r.rating) AS u2_mean, ratings

                    UNWIND ratings AS r

                    WITH sum( (r.r1.rating-u1_mean) * (r.r2.rating-u2_mean) ) AS nom,
                        sqrt( sum( (r.r1.rating - u1_mean)^2) * sum( (r.r2.rating - u2_mean) ^2)) AS denom,
                        u1, u2 WHERE denom <> 0

                    WITH u1, u2, nom/denom AS pearson
                    ORDER BY pearson DESC LIMIT 10

                    MATCH (u2)-[r:LIKES]->(m:Clothing) WHERE NOT EXISTS( (u1)-[:LIKES]->(m) )

                    RETURN m, SUM( pearson * r.rating) AS score
                    ORDER BY score DESC LIMIT 25`;

const populars = `MATCH (a:User)-[r:LIKES]->(c:Clothing)
                  WHERE NOT (:User {email: $emailParam})-[]->(c)
                  RETURN c, SIZE(COLLECT(a)) as likes
                  ORDER BY likes DESC LIMIT 20`;

const popularsRating = `MATCH (a:User)-[r:LIKES]->(c:Clothing)
                        WHERE NOT (:User {email: $emailParam})-[]->(c)
                        WITH c, COLLECT(r.rating) as likes
                        UNWIND likes AS likesret
                        RETURN c, AVG(likesret) AS len
                        ORDER BY len DESC LIMIT 10`;

const random = `MATCH   (n:Clothing)
                WHERE   (NOT (n)-[]-())
                WITH n, rand() AS number
                RETURN n 
                ORDER BY number
                LIMIT 5`;
        
// MATCH(u) - [: DISLIKES] - > (dc: Clothing) < -[: DISLIKES] - (d) - [: LIKES] - > (dislike)
// WHERE NOT(dislike) < -[] - (u)
const fullstack = `MATCH (u:User {email: $emailParam})-[:LIKES]->(lc:Clothing)<-[:LIKES]-(l)-[:LIKES]->(like)
                  WHERE NOT EXISTS ( (like)<-[]-(u) )
                  WITH [like] as results
                  UNWIND results AS x
                  UNWIND x AS y
                  WITH y, count(y) as frequency
                  ORDER BY frequency DESC
                  LIMIT 20 RETURN y

                  UNION

                  MATCH   (n:Clothing)
                  WHERE NOT EXISTS ( (n)<-[]-() )
                  WITH n, rand() AS number
                  RETURN n AS y
                  ORDER BY number
                  LIMIT 5`;

const signup = 'CREATE(u:User {email: $emailParam, password: $passParam}) RETURN u.email';

`MATCH (u1:User {email:"u1@gmail.com"})-[r:LIKES]->(m:Clothing)
WITH u1, avg(r.rating) AS u1_mean

MATCH (u1)-[r1:LIKES]->(m:Clothing)<-[r2:LIKES]-(u2)
WITH u1, u1_mean, u2, COLLECT({r1: r1, r2: r2}) AS ratings WHERE size(ratings) > 10

MATCH (u2)-[r:LIKES]->(m:Clothing)
WITH u1, u1_mean, u2, avg(r.rating) AS u2_mean, ratings

UNWIND ratings AS r

WITH sum( (r.r1.rating-u1_mean) * (r.r2.rating-u2_mean) ) AS nom,
     sqrt( sum( (r.r1.rating - u1_mean)^2) * sum( (r.r2.rating - u2_mean) ^2)) AS denom,
     u1, u2 WHERE denom <> 0

WITH u1, u2, nom/denom AS pearson
ORDER BY pearson DESC LIMIT 10

MATCH (u2)-[r:LIKES]->(m:Clothing) WHERE NOT EXISTS( (u1)-[:LIKES]->(m) )

RETURN m.title, SUM( pearson * r.rating) AS score
ORDER BY score DESC LIMIT 25`

const signin = 'MATCH (u:User { email: $emailParam }) RETURN u';

const likes = `MATCH (n:User {email: $emailParam})-[r:LIKES]->(c)
              RETURN c`;
const likesRating = `MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)
                    WHERE r.rating >= 5
                    RETURN c ORDER BY r.rating DESC`;
const dislikesRating = `MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)
                    WHERE r.rating <= 5
                    RETURN c ORDER BY r.rating DESC`;
const historicalAsc = `MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)
                    RETURN c ORDER BY r ASC`
const historicalDesc = `MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)
                    RETURN c ORDER BY r DESC`
const ratingAsc = `MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)
                    RETURN c ORDER BY r.rating ASC`
const ratingDesc = `MATCH (u:User {email: $emailParam})-[r:LIKES]->(c:Clothing)
                    RETURN c ORDER BY r.rating DESC`
const dislikes = `MATCH (n:User {email: $emailParam})-[r:DISLIKES]->(c)
              RETURN c`;
const favorites = `MATCH (n:User {email: $emailParam})-[r:FAVORITE]->(c)
              RETURN c`;
const bought = `MATCH (n:User {email: $emailParam})-[r:BUY]->(c)
              RETURN c `;
const vote = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ code: $clothingParam })
              MATCH(u) - [likeExist] - > (c)
              DETACH DELETE likeExist
              CREATE (u)-[r:LIKES {rating: $ratingParam}]->(c)`
const like = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ code: $clothingParam })
              CREATE (u)-[r:LIKES]->(c)`
const dislike = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ code: $clothingParam })
              CREATE (u)-[r:DISLIKES]->(c)`
const favorite = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ code: $clothingParam })
              CREATE (u)-[r:FAVORITE]->(c)`
const buy = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ code: $clothingParam })
              CREATE (u)-[r:BUY]->(c)`



module.exports = {
  stack, populars, signup, signin, likes, dislikes, favorites, bought,
  like, dislike, favorite, buy, random, fullstack, vote, stackRating, 
  popularsRating, likesRating, dislikesRating,
  historicalAsc, historicalDesc, ratingAsc, ratingDesc
}