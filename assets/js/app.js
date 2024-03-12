$(document).ready(function () {
    //declaramos las variables.
    const Findbtn = $("#form")
    const textForm = $("#textForm")
    const finalSucces = $("#finalSucces")

    //Funcion del boton buscar y controlamos el event del form
    Findbtn.on("submit", function (e) {
        e.preventDefault()


        //conectandonos a la API
        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${textForm.val()}`,
            method: "GET",
            success(data) {

                //aqui tomamos y agregamos datos para el grafico
                const dataLabels = [
                    { y: data.powerstats.intelligence, label: "Inteligencia" },
                    { y: data.powerstats.strength, label: "Fuerza" },
                    { y: data.powerstats.speed, label: "velocidad" },
                    { y: data.powerstats.durability, label: "durabilidad" },
                    { y: data.powerstats.power, label: "poder" },
                    { y: data.powerstats.combat, label: "combate" },

                ]
                console.log(dataLabels)
                //imprimir en el DOM los talentos del Hero
                finalSucces.html(`
                <h3 class="text-center">Aqui esta tú SuperHero elegido</h3>
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.image.url}"
                                class="img-fluid rounded-start" alt="Imagen de la tarjeta">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">

                                <h5 class="card-title">Nombre : ${data.name}</h5>
                                <p class="card-text">Conexiones: ${data.connections["group-affiliation"]}
                                ${data.connections["relatives"]}</p>
                                <div class="ms-4">
                                    <p>Publicado por: ${data.biography.publisher}</p>
                                    <hr>
                                    <p>Ocupación : ${data.work.occupation}</p>
                                    <hr>
                                    <p>Primera Aparición : ${data.biography["first-appearance"]}</p>
                                    <hr>
                                    <p>Altura: ${data.appearance.height}</p>
                                    <hr>
                                    <p>Peso: ${data.appearance.weight}</p>
                                    <hr>
                                    <p>Alianza: ${data.biography.aliases}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                             
                `)
                // declaramos la variable para mostrar grafico
                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2",
                    animationEnabled: true,
                    title: {
                        text: "Estadisticas de Tú Hero Elegido"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}",
                        dataPoints: dataLabels
                    }]
                });
                chart.render();

            },
            error(e) {
                console.error("Ocurrio un error en la Conexion vuelva a intentarlo" + e.statusCode)

            }
        })


    })

})