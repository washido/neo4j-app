# Screens

Login
![Login](https://raw.githubusercontent.com/washido/neo4j-app/master/public/images/screen-login.png)

Choose Recommendation
![Choose](https://raw.githubusercontent.com/washido/neo4j-app/master/public/images/screen-choose.png)

Recommendations
![Recomendations](https://raw.githubusercontent.com/washido/neo4j-app/master/public/images/screen-recommend.png)


# READ CSV and IMPORT

## SONGS
```
LOAD CSV WITH HEADERS FROM "http://localhost:3333/songs.csv" AS line WITH line
CREATE (s:Song { id: toInt(line.id), title: line.title, url: line.url, image: line.image })
```

## MOVIES
```
LOAD CSV WITH HEADERS FROM "http://localhost:3333/movies.csv" AS line WITH line
CREATE (m:Movie { id: toInt(line.id), title: line.title, url: line.url, image: line.image })
```

## BOOKS
```
LOAD CSV WITH HEADERS FROM "http://localhost:3333/books.csv" AS line WITH line
CREATE (b:Book { id: toInt(line.id), title: line.title, url: line.url, image: line.image })
```

## USERS
```
CREATE (u:User { username: 'icaromh' })
```

## ADD RELATIONS
```
MATCH (u:User {username: 'icaromh'}), (m:Movie { id:138409202896344 })
MERGE (u)-[r:WATCHED]->(m)
RETURN u, m

MATCH (u:User {username: 'icaromh'}), (n:Song { id:138409202896344 })
MERGE (u)-[r:LISTENED]->(n)
RETURN u, n

MATCH (u:User {username: 'icaromh'}), (n:Book { id:138409202896344 })
MERGE (u)-[r:READ]->(n)
RETURN u, n
```

## REMOVE RELATIONS
```
MATCH (u:User {username: 'icaromh'})-[r:WATCHED]->(m:Movie { id:138409202896344 })
DELETE r
RETURN u, m
```

## RECOMMEND SOMETHING
```
MATCH 
  (me)-->(s)<--(p)
WHERE 
  me.username = 'icaromh'
WITH p, me, count(s) AS c
ORDER BY c DESC

MATCH 
  (p)--(n)
WHERE 
  NOT (me)--(n)
  AND n:Book
RETURN n
```




The symbol `--` means related to, without regard to type or direction of the relationship.


Third party scripts:

- http://jquery.eisbehr.de/lazy/

- http://www.listjs.com/

- https://www.iconfinder.com/iconsets/iconic-1