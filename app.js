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

	--hacer el return del edit (la misma pagina on un query en la url que tire un alert?)
	--hacer que muestre de a n registros on un query en la url tambien?
	--ordenarlos del ultimo al priero?
	--form de insert

	-- front end 


*/


var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring')
var db = require('./scripts/maisql.js');


//descomentar la linea de abajo para crear la tabla y seedear la base de datos
//inicializarDB()

async function inicializarDB(){

	await db.makeQueryDB("createTable")
	db.seedDB(20);
}

http.createServer(function (req, res) {

	var ur = url.parse(req.url, true);
	console.log(ur.pathname);

	switch(ur.pathname){

		case "/img/alkemy.png":
			fs.readFile('front/img/alkemy.png', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200);
				res.end(data);
			});
		break;

		case "/css/general.css":
			fs.readFile('front/css/general.css', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200);
				res.end(data);
			});
		break;

		case "/css/list.css":
			fs.readFile('front/css/list.css', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200);
				res.end(data);
			});
		break;

		case "/css/index.css":
			fs.readFile('front/css/index.css', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200);
				res.end(data);
			});
		break;

		case "/scriptsfront/scriptindex.js":
			fs.readFile('front/scriptsfront/scriptindex.js', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			});
		break;

		case "/scriptsfront/scriptlist.js":
			fs.readFile('front/scriptsfront/scriptlist.js', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			});
		break;

		case "/scriptsfront/scriptinput.js":
			fs.readFile('front/scriptsfront/scriptinput.js', function(err, data) {
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			});
		break;

		case "/index.html":
			fs.readFile('front/index.html', function(err, data) {
				
				if (err) console.log(err);
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(data);
			});
		break;
		
		case "/list.html":

			fs.readFile('front/list.html', function(err, data) {
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

		case "/editRecord":
			req.on('data', (data) => {
				changeDB(data, res, 'edit') 
			})
		break;

		case "/insertRecord":
			req.on('data', (data) => {
				changeDB(data, res, 'insert') 
			})
		break;
		
		case "/deleteRecord":
			req.on('data', (data) => {
				changeDB(data, res, 'delete') 
			})
		break;

		default: 
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end("fourofourrr");

	}

}).listen(8080);

async function changeDB(data, res, type) {
	var data = querystring.decode(""+data);
	await db.makeQueryDB(type, data)

	var urlRes = url.parse(data.url, true).pathname;	
	
	
	fs.readFile("front"+urlRes, function(err, data) {
			if (err) console.log(err);
			res.writeHead(301, {"Location": urlRes});
			//res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data);
		});
	
}


async function getQuery(res, type) {
  
  var retquery = await db.makeQueryDB(type);
  res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(retquery))
  
}

