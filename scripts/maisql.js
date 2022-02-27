var mysql = require('mysql');

var createTableQuery = "CREATE TABLE operations (OpID int NOT NULL AUTO_INCREMENT PRIMARY KEY, Concepto VARCHAR(40) NOT NULL, Monto DECIMAL(12, 2) NOT NULL, FechaCreado TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, FechaEditado TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, IngEgr ENUM('Ingreso', 'Egreso') NOT NULL);"


var con = mysql.createConnection({
  host: "localhost",
  user: "alkfs",
  password: "alkpass",
  database: 'alkdb'
  
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function makeQueryDB(sql) {
  return con.query(sql, function(err, result){
    if (err) throw err;
    console.log("maisql" + result)
  })

}

function getRecords(sql) {
  return new Promise(function(resolve, reject){
    con.query("SELECT * FROM operations", function (err, result, fields) {
      if (err) throw err;
      resolve(result)
          /*Object.keys(result).forEach(function(key) {
          //console.log("key" + key)
            var row = result[key];
            for (const property in row) {
            //console.log(`${property}: ${row[property]}`);
            }
      
          });*/
   
      })
    })    
}


function buildSqlInsert(param) {

  if (!param) param = createRandomizedParam()

  var sql ="INSERT INTO operations (Concepto, Monto, IngEgr)VALUES (";
  sql += `'${param.concepto}', '${param.monto}','${param.IngEgr}');` 

  return sql;
  
}

function createRandomizedParam() {
  return {concepto:"randomizado",
          monto: Math.floor(Math.random() * 400),
          IngEgr: 1 + Math.floor(Math.random()*2)
          };
}


function seedDB(n) {
  for (let i = 0; i <n; i++) makeQueryDB(buildSqlInsert())
}

function test() {console.log("test");}

//var objTest ={concepto:"testenum2",monto:30,IngEgr:2};

//makeQueryDB(buildSqlInsert(objTest))


exports.test = test;
exports.seedDB = seedDB;
exports.makeQueryDB = makeQueryDB;
exports.getRecords = getRecords;