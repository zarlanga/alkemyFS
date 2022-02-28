function mostrarFormInput() {
	//encontrado error de nueva linea pero no su solucion
	var cont = document.getElementById('formInput');
	cont.innerHTML += '<form action="insertRecord" method="post"><input type="date" name="FechaCreado" required><input type="text" name="Concepto" placeholder="Concepto" required><input type="number" name="Monto" placeholder="Monto" required><select  name="IngEgr" ><option value="1">Ingreso </option><option value="2">Egreso </option></select><input type="text" name="url" style="display:none" value="'+document.URL +'"></input><input type="submit" value="AgregarRegistro" ></form><br>';
}