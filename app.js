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
	
*/

var http = require('http');


http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'});
  		res.end('test');
	}).listen(8080);