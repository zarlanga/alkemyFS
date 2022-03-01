		fetch('getSaldo')
			.then(data => data.json())
			.then(data => document.getElementById('saldo').innerHTML =
			 `SALDO ACTUAL: <span style=${"color:" + (data[0].saldo >= 0 ? "green": "red")}>${data[0].saldo}</span>` )
				//JSON.stringify(data));
		fetch('last10')
			.then(data => data.json())
			.then(data => {
				for (r of data) document.getElementById('last10'). innerHTML += `<tr>
						<td>${getDateYo(r.FechaCreado)}</td>
						<td>${r.Concepto}</td>
						<td style=${"color:" + (r.IngEgr == "Ingreso" ? "green": "red")}> ${r.Monto}</td>
						<td> ${r.IngEgr}</td> </tr>`
			})

	function getDateYo(timestamp) {
		console.log(timestamp);
		
		timestamp = timestamp.slice(0,timestamp.indexOf("T"))
		return timestamp;
	}		