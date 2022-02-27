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

*/


var http = require('http');
var url = require('url');
var fs = require('fs');

var db = require('./scripts/maisql.js');

//db.test();

//db.seedDB(10);

http.createServer(function (req, res) {

	var ur = url.parse(req.url, true);
	console.log(ur.pathname);

	switch(ur.pathname){

		case "/index.html":
			fs.readFile('front/index.html', function(err, data) {
				
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			});
		break;
			
		case "/testfetch":
			getQuery(res)
		break;

		case "/getSaldo":
			getQuery(res, "saldo");
		break;

		case "/last10":
			getQuery(res, "last10");
		break;

		case "/getFullList":
			getQuery(res, "allRecords");
		break;

		case "/list.html":

			fs.readFile('front/list.html', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			});
			
		break;

		default: 
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end("fourofourrr");

	}

}).listen(8080);


async function getQuery(res, type) {
  
  var retquery = await db.makeQueryDB(type);
  res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(retquery))
  
}