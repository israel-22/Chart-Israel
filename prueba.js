// Función para calcular el IMC y mostrar mensaje dentro del div
function calcularIMC() {
    // Obtener los valores de peso y talla
    let peso = parseFloat(document.getElementById('peso').value);
    let talla = parseFloat(document.getElementById('talla').value);

    // Validar que los valores ingresados sean numéricos y mayores que cero
    if (isNaN(peso) || isNaN(talla) || peso <= 0 || talla <= 0) {
        document.getElementById('mensajeAlerta').value = 'Por favor ingresar valores válidos para el peso y la talla.';
        return;
    }

    // Calcular el IMC
    let imc = peso / (talla * talla);
    imc = imc.toFixed(2); // Redondear el IMC a dos decimales
    let mensaje = '';

    // Determinar el mensaje según el IMC calculado
  
    if(imc<18.5){
        alert('Tu IMC muestra'+imc+',indices de bajo peso y desnutricion');
    }else if(imc>=18.5 && imc <25){
        alert('Tu IMC muestra'+imc+',indices de peso de rango saludable');
    } else if(imc>=25 && imc<30){
        alert('Tu IMC muestra'+imc+',indices de sobrepeso fuera del rango saludable');
    }else{
        alert('Tu IMC muestra'+imc+',indices de sobrepeso y obesidad');
    }

    // Mostrar el mensaje en el elemento HTML
    document.getElementById('mensajeAlerta').value = mensaje;

    // Actualizar la gráfica
    actualizarGrafica(peso, talla, imc);
}

// Función para actualizar la gráfica con el IMC calculado
function actualizarGrafica(peso, talla, imc) {
    let ctx = document.getElementById('graficaPercentil').getContext('2d');

    // Ejemplo de datos quemados para Percentil
    let Percentiles = {
        peso: [2.5, 25, 50, 75, 97.5],
        talla: [2.5, 25, 50, 75, 97.5],
        imc: [2.5, 25, 50, 75, 97.5]
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
            data: [Percentiles.peso[2], Percentiles.talla[2], Percentiles.imc[2]],
            yAxisID: 'yPercentiles'
        }]
    };

    // Configurar opciones de la gráfica
    let options = {
        scales: {
            yDatos: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Valores'
                }
            },
            yPercentiles: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Percentiles'
                },
                grid: {
                    drawOnChartArea: false
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
