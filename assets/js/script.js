// $ ` 		https://www.superheroapi.com/api.php/111905728063649/213

function validaNumericos(event) {
    if(event.charCode >= 48 && event.charCode <= 57){
      return true;
     }
     return false;
}

	$(document).ready(function() {
	$("form").submit(function (event){
		event.preventDefault();

	let valueInput = $ ("#heroInput").val();
		if(valueInput>732){
			alert("Acepta numeros entre 1 y 732")
		}

	$.ajax({
		url: "https://www.superheroapi.com/api.php/111905728063649/" + valueInput,
		success: function(data) {
		let imagen = data.image.url;
		let nombre = data.name;
		let conexion = data.connections["group-affiliation"];
		let publicado = data.biography.publisher;
		let trabajo = data.work.occupation;
		let aparicion = data.biography["first-appearance"];
		let altura = data.appearance.height;
		let peso = data.appearance.weight;
		let alianza = data.biography.aliases;

	$("#heroInfo").html(`

<h5 class="card-title text-center">SuperHero Encontrado</h5>
	<div class="card col-12">
 		 <div class="row g-0">
			  <div class="col-md-4 py-auto my-auto">
				<img src="${imagen}" class="img-fluid rounded-start ps-3">
			  </div>
		  		<div class="col-8">
					<div class="card-body">
				      	<p class="m-0 fw-bold">Nombre: ${nombre}</p>
				      	<p class="m-1 small">Conexiones: ${conexion}</p>
				      	<br class="m-0 small">
						<p class="m-0 ps-3 small"><i>Publicado por:</i> ${publicado}</p>
						<hr class="m-0 small">
				      	<p class="m-0 ps-3 small"><i>Ocupacion:</i> ${trabajo}</p>
				      	<hr class="m-0 small">
				      	<p class="m-0 ps-3 small"><i>Primera aparicion:</i> ${aparicion}</p>
				      	<hr class="m-0 small">
				      	<p class="m-0 ps-3 small"><i>Altura:</i> ${altura.join(" - ")}</p>
				      	<hr class="m-0 small">
				      	<p class="m-0 ps-3 small"><i>Peso:</i> ${peso.join(" - ")}</p>
				      	<hr class="m-0 small">
				      	<p class="m-0 ps-3 small"><i>Alianzas:</i> ${alianza}</p>
					</div>
				</div>
		</div>
    </div>
`);
	let powerstatsdata = data.powerstats;
	let estadisticas = [];
		for(propiedad in powerstatsdata){
			estadisticas.push({
				label: propiedad,
				y: powerstatsdata[propiedad],
			});
		}

	let config = {
	animationEnabled : true,
		title: {		
			text: "Estadisticas de poder para " + data.name,		
		},

		data: [
		{
			type: "pie",
			showInLegend:"true",
			legendText: "{label}",
			dataPoints: estadisticas,
		},
		],
	};
	
	let chart = new CanvasJS.Chart("heroStats", config);
	chart.render()

			},
		});
	});
});


