fetch('getFullList')
		.then(data => data.json())
		.then(data => {
			for (r of data) {
				var text = `<div class='row'>
								<form action="editRecord" id=${'r' + r.OpID} class=${r.IngEgr == "Ingreso" ? 'ingreso' : 'egreso'} method="post">
									<input type="text" name="OpID" value='${r.OpID}' size="5" readonly>
									<input type="date" name="FechaCreado" value='${getDateYo(r.FechaCreado)}' readonly required>
									<input type="text" name="Concepto" value='${r.Concepto}' readonly required>
									<input type="number" name="Monto" value='${r.Monto}' readonly required>
									<input type="text" name="IngEgr" value='${r.IngEgr}'size="8" disabled>
									<input type="text" name="url" style="display:none" value="${document.URL}"></input>
									<button id=${'b' + r.OpID} type="button" onclick='habilitar(${r.OpID})'>Editar</button>
									<input id=${'s' + r.OpID} type="submit" value="Realizar Cambios" style="display:none"> 
								</form>
								<form action="deleteRecord" method="post">
									<input type="text" name="url" style="display:none" value="${document.URL}"></input>
									<input type="text" name="OpID" value='${r.OpID}' size="5" style="display:none">
									<input type="submit" value="Eliminar Registro" style="background-color:red"> 
								</form>
							</div>`
				document.getElementById("list").innerHTML += text;

			}
		})

	function habilitar(id) {
		//var formSelector = "r"+id;
		var form =document.getElementById("r"+id);

		var subitemsSelector = `#r${id} input:required`
		var fields = document.querySelectorAll(subitemsSelector);
		var button1 = document.getElementById("b"+id);
		var button2 = document.getElementById("s"+id);

		if (button1.innerHTML == "Editar" ) {
			fields.forEach(i =>{
					//if(i.getAttribute("name") != "OpID" && i.getAttribute("readonly" == true)){
						i.removeAttribute("readonly")
						i.style.backgroundColor = "cyan"
					//} 
				})
			button1.innerHTML = "Descartar Cambios";
			button2.style.display = "";
			button2.style.backgroundColor = "green";
			

		} else {
			//location.reload()
			fields.forEach(i =>{
					i.setAttribute("readonly", "true")
					i.style.backgroundColor = "white"
				})
			form.reset();
			button1.innerHTML ="Editar";
			button2.style.display = "none";
		} 

	}


	function getDateYo(timestamp) {
		console.log(timestamp);
		
		timestamp = timestamp.slice(0,timestamp.indexOf("T"))
		return timestamp;
	}

	function filtrarRegistros(f) {
		var ing = document.querySelectorAll(".ingreso");
		var egr = document.querySelectorAll(".egreso");
		switch (f) {
			case "Todos":
				ing.forEach(i => i.style.display = "");
				egr.forEach(e => e.style.display = "");
			break;
			
			case "Ingresos":
				ing.forEach(i => i.style.display = "");
				egr.forEach(e => e.style.display = "none");
			break;

			case "Egresos":
				ing.forEach(i => i.style.display = "none");
				egr.forEach(e => e.style.display = "");
			break;
		}

	}
