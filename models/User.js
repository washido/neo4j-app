var neo4j = require('neo4j');
var db    = new neo4j.GraphDatabase('http://neo4j:admin@localhost:7474');

function find(username, callback){
  var query = [
    'MATCH (n)',
    'WHERE n.username = {username}',
    'RETURN n'
  ].join('\n');

  var params = {
    "username": username
  };

  console.log(query, params);
  db.query(query, params, function(err, results){
    if(err) callback(err.message);
    var data = results.map(function (result) {
      return result.n._data.data;
    });

    callback(null, !!data.length);
  });
}

function insert(username, callback){
  var query = 'CREATE (u:User { username: {username} })';
  var params = {
    "username": username
  };

  console.log(query, params);
  db.query(query, params, function(err, results){
    if(err) callback(err.message);
    callback(true);
  });
}

function findInsert(username, callback){
  find(username, function(err, data){
    if(data) callback(err, data);
    else{
      insert(username, function(err, data){
        callback(err, data);
      });
    }
  });
}

function removeMedia(params, callback){
  var relation = {
    'Movie': 'WATCHED',
    'Book': 'READ',
    'Song': 'LISTENED',
  };

  var query = [
    'MATCH (u:User {username:"' + params.username + '"} )-[r:' + relation[params.type] + ']->(m:'+ params.type + ' {id:' + params.id + '})',
    'DELETE r',
    'RETURN u, m'
  ].join('\n');

  console.log(query);
  db.query(query, function(err, results){
    if(err) callback(err.message);
    else callback(null,results);
  });

}

function addMedia(params, callback){

  var relation = {
    'Movie': 'WATCHED',
    'Book': 'READ',
    'Song': 'LISTENED',
  };

  var query = [
    'MATCH (u:User {username:"' + params.username + '"} ), (n:'+ params.type + ' {id:' + params.id + '})',
    'MERGE (u)-[r:' + relation[params.type] + ']->(n)',
    'RETURN u, n'
  ].join('\n');


  console.log(query);
  db.query(query, function(err, results){
    if(err) callback(err.message);
    else callback(null, results);
  });

}

module.exports = {
  "findInsert" : findInsert,
  "addMedia": addMedia,
  "removeMedia": removeMedia
};
