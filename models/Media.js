var neo4j = require('neo4j');
var db    = new neo4j.GraphDatabase(process.env.GRAPHENEDB_URL ||'http://neo4j:admin@localhost:7474');

function findAll(type, callback){
  var query = [
    'MATCH (n)',
    'WHERE n:' + type,
    'RETURN n'
  ].join('\n');

  // var params = {
    // "type": type
  // };

  console.log(query);
  db.query(query, function(err, results){
    if(err) callback(err.message);
    else{
      var data = results.map(function (result) {
        return result.n._data.data;
      });

      callback(null, data);
    }
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

function recommend(username, type, callback){
  var query = [
    'MATCH',
      '(me)-->(s)<--(p)',
    'WHERE',
      'me.username = {username}',
    'WITH p, me, count(s) AS c',
    'ORDER BY c DESC',
    'MATCH',
      '(p)--(n)',
    'WHERE',
      'NOT (me)--(n)',
      'AND n:'+type,
    'RETURN n'
    ].join('\n');

  var params = {
    'username' : username
  }

  console.log(query, params);
  db.query(query, params, function(err, results){
    if(err) callback(err.message);
    else{
      var data = results.map(function (result) {
        return result.n._data.data;
      });
      callback(err, data);
    }
  });

}

module.exports = {
  "findAll" : findAll,
  "recommend" : recommend
};
