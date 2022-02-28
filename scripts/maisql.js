var mysql = require('mysql');


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


function makeQueryDB(type, obj) {

  var sql =buildQuery(type, obj);


  return new Promise(function(resolve, reject){
    con.query(sql, function (err, result) {
        if (err) throw err;
        resolve(result)
      })
    })    
}


function buildQuery(type, obj) {
  switch (type) {
    case "allRecords":
      return "SELECT * FROM operations"
    break;

    case "saldo":
      return  "SELECT (SELECT sum(monto) AS SaldoP FROM operations WHERE IngEgr =1)-(SELECT sum(monto) AS SaldoN FROM operations WHERE IngEgr =2) as saldo;"
    break;
    
    case "createTable":
      return "CREATE TABLE operations (OpID int NOT NULL AUTO_INCREMENT PRIMARY KEY, Concepto VARCHAR(40) NOT NULL, Monto DECIMAL(12, 2) NOT NULL, FechaCreado TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, FechaEditado TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, IngEgr ENUM('Ingreso', 'Egreso') NOT NULL);"    
    break

    case "insertRandom":
      return buildSqlInsert();
    break;

    case "last10":
      return "SELECT * FROM operations ORDER BY OpID DESC LIMIT 10;"
    break;

    case "edit":
      return `UPDATE operations 
      SET Monto = ${obj.Monto}, Concepto = '${obj.Concepto}' /*, FechaCreado = ${obj.FechaCreado + 'T00:00:00.000Z'}*/ 
      WHERE OpID = ${obj.OpID}`
    break;

    default:
      return "SELECT * FROM operations"
    break;
  }
  
  
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
  for (let i = 0; i <n; i++) makeQueryDB("insertRandom")
}

function test() {console.log("test");}

//var objTest ={concepto:"testenum2",monto:30,IngEgr:2};

//makeQueryDB(buildSqlInsert(objTest))


exports.test = test;
exports.seedDB = seedDB;
exports.makeQueryDB = makeQueryDB;
//exports.getRecords = getRecords;