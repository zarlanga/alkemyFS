//start
/*
server
	paginas: -home
				La pantalla de inicio deberá mostrar el balance actual, es decir, el resultante de los
ingresos y egresos de dinero cargados, y un listado de los últimos 10 registrados.
			 
			 -Formulario de registro de operación. El mismo deberá contener:
				Concepto
				Monto
				Fecha
				Tipo (ingreso o egreso)
				Listado de operaciones registradas según su tipo (ingreso o egreso).
				Desde el listado, se debe poder modificar o eliminar una operación registrada
					previamente. No debe ser posible modificar el tipo de operación (ingreso o
					egreso) una vez creada.
			 -
			 -login?
	
	database: setup
	 tabla: operaciones (id, concepto, monto, fecha, ingreso/egreso, {idusuario?, categoriaDeOperacion?})


CREATE USER 'alkfs'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'alkpass';

Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

CAMBIAR EL IDENTIFIED WITH!!
	
mysql_native_password 

GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'alkfs'@'localhost' WITH GRANT OPTION;


var con = mysql.createConnection({
  host: "localhost",
  user: "alkfs",
  password: "alkpass",
  database: 'alkdb'
  
});

*/

console.log("in");



var http = require('http');
var url = require('url');

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



http.createServer(function (req, res) {

	var ur = url.parse(req.url, true);
	console.log(ur.pathname);

	switch(ur.pathname){

		case "/index.html":
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end('HOME');
		break;
		
		case "/list.html":
			var ret ="";
			for (let i =0; i<10; i++) ret += 'list ' + i + "<br>"
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(ret);
		break;

		default: 
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end("fourofourrr");

	}

}).listen(8080);