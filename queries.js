
const stack = `MATCH (u:User {email: $emailParam})-[:LIKES]->(lc:Clothing)<-[:LIKES]-(l)-[:LIKES]->(like)
              WHERE NOT (u)-[:LIKES]->(like) AND NOT (u)-[:DISLIKES]->(like)
              MATCH (u)-[:DISLIKES]->(dc:Clothing)<-[:DISLIKES]-(d)-[:LIKES]->(dislike)
              WHERE NOT (u)-[:LIKES]->(dislike) AND NOT (u)-[:DISLIKES]->(dislike)
              WITH [like, dislike] as results
              UNWIND results AS x
              UNWIND x AS y
              RETURN y, count(y) as frequency
              ORDER BY frequency DESC
              LIMIT 20`;

const populars = `MATCH (a:User)-[r:LIKES]->(c:Clothing)
                  WHERE NOT (:User {email: $emailParam})-[:LIKES]->(c) AND NOT (:User {email: $emailParam})-[:DISLIKES]->(c)
                  RETURN c, SIZE(COLLECT(a)) as likes
                  ORDER BY likes DESC LIMIT $limit`;

const signup = 'CREATE(u:User {email: $emailParam, password: $passParam}) RETURN u.email';

const signin = 'MATCH (u:User { email: $emailParam }) RETURN u';

const likes = `MATCH (n:User {email: $emailParam})-[r:LIKES]->(c)
              RETURN c`;
const dislikes = `MATCH (n:User {email: $emailParam})-[r:DISLIKES]->(c)
              RETURN c`;
const favorites = `MATCH (n:User {email: $emailParam})-[r:FAVORITE]->(c)
              RETURN c`;
const bought = `MATCH (n:User {email: $emailParam})-[r:BUY]->(c)
              RETURN c`;
const like = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ name: $clothingParam })
              CREATE (u)-[r:LIKES]->(c)`
const dislike = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ name: $clothingParam })
              CREATE (u)-[r:DISLIKES]->(c)`
const favorite = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ name: $clothingParam })
              CREATE (u)-[r:FAVORITE]->(c)`
const buy = `MATCH (u: User{ email: $emailParam })
              MATCH (c: Clothing{ name: $clothingParam })
              CREATE (u)-[r:BUY]->(c)`



module.exports = {
  stack, populars, signup, signin, likes, dislikes, favorites, bought, like, dislike, favorite, buy
}