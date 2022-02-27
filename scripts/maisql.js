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
  con.query(sql, function(err, result){
    if (err) throw err;
    console.log(result)
  })

}


function buildSqlInsert (param) {

  if (!param) param = createRandomizedParam()

  var sql ="INSERT INTO operations (Concepto, Monto, IngEgr)VALUES (";
  sql += `'${param.concepto}', '${param.monto}','${param.IngEgr}');` 

  return sql;

  
}

function createRandomizedParam() {
  var obj = {};
}

var objTest ={concepto:"empanadas",monto:100,IngEgr:"Ingreso"};

makeQueryDB(buildSqlInsert(objTest))


function test() {console.log("test");}

exports.test = test;