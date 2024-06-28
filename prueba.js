const { Title } = require("chart.js");

// Función para calcular el IMC
function calcularIMC() {
    // Obtener los valores de peso y talla
    let peso = parseFloat(document.getElementById('peso').value);
    let talla = parseFloat(document.getElementById('talla').value);

    // Validar que los valores ingresados sean numéricos y mayores que cero
    if (isNaN(peso) || isNaN(talla) || peso <= 0 || talla <= 0) {
        alert('Por favor ingresa valores válidos para peso y talla.');
        return;
    }

    // Calcular el IMC
    let imc = peso / (talla * talla).toFixed(2);

    // Redondear el IMC a dos decimales
    // imc = imc.toFixed(2);

    // Mostrar el IMC en consola (para verificar)
    console.log('IMC calculado:', imc);

    // Actualizar la gráfica
    actualizarGrafica(peso,talla,imc);
}

// Función para actualizar la gráfica con el IMC calculado
function actualizarGrafica(peso,talla,imc) {
    let ctx = document.getElementById('graficaPercentil').getContext('2d');

    //Ejemplo de datos quemados para Percentil
    let Percentiles={
        peso:[2.5,25,50,75,97.5],
        talla:[2.5,25,50,75,97.5],
        imc:[2.5,25,50,75,97.5]
    };

    // Definir los datos para la gráfica
    let data = {
        labels: ['Peso (kg)', 'Talla (m)', 'IMC'], // Etiqueta para cada conjunto de datos
        datasets: [{
            label: 'Datos',
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            data: [peso, talla, imc],
            yAxisID: 'yDatos'
        }, {
            label: 'Percentil 50',
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            data: [Percentiles.peso[2],Percentiles.talla[2], Percentiles.imc[2]],
            yAxisID: 'yPercentiles'
        },
        //  {
        //     label: 'IMC',
        //      borderColor: 'rgba(75, 192, 192, 1)',
        //     backgroundColor: 'rgba(75, 192, 192, 0.2)',
        //     data: [imc],
        //    yAxisID: 'yIMC'
        //  }
        ]};

    // Configurar opciones de la gráfica
    let options = {
        scales: {

            yDatos:{
                type:'linear',
                position: 'left',
                Title:{
                    display:true,
                    text:'Valores'
                }
            },
            yPercentiles:{
                type:'linear',
                position:'right',
                Title:{
                    display:true,
                    text:'Percentiles'
                },
                grid:{
                    drawOnChartArea:false
                }
            }
        }
    };

    // Si myChart ya está definido, destruirlo antes de crear uno nuevo
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Crear la instancia de la gráfica
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}


