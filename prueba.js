// Función para calcular la edad y los meses automáticamente
function calcularEdad() {
    let fechaNacimiento = new Date(document.getElementById('fecha-nacimiento').value);
    let hoy = new Date();
    
    let edadAnios = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let edadMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (edadMeses < 0 || (edadMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edadAnios--;
        edadMeses += 12;
    }
    
    document.getElementById('edad').value = edadAnios;
    document.getElementById('meses').value = edadMeses;
}

// Función para calcular el IMC y mostrar mensaje dentro del textarea
function calcularIMC() {
    // Obtener los valores de peso, talla, hemoglobina y edad
    let peso = parseFloat(document.getElementById('peso').value);
    let talla = parseFloat(document.getElementById('talla').value);
    let hemoglobina = parseFloat(document.getElementById('hemog').value);
    let edad = parseInt(document.getElementById('edad').value);

    // Validar que los valores ingresados sean numéricos y mayores que cero
    if (isNaN(peso) || isNaN(talla) || isNaN(hemoglobina) || isNaN(edad) || peso <= 0 || talla <= 0 || hemoglobina <= 0 || edad <= 0) {
        document.getElementById('IMC').value = 'Por favor ingresar valores válidos para la edad, peso, talla y la hemoglobina.';
        return;
    }

    // Calcular el IMC
    let imc = peso / (talla * talla);
    imc = imc.toFixed(2); // Redondear el IMC a dos decimales

    // Determinar el mensaje según el IMC calculado
    let mensaje = '';
    if (imc < 18.5) {
        mensaje = `Tu IMC es ${imc}, indica bajo peso y desnutrición.`;
    } else if (imc >= 18.5 && imc < 25) {
        mensaje = `Tu IMC es ${imc}, indica un peso de rango saludable.`;
    } else if (imc >= 25 && imc < 30) {
        mensaje = `Tu IMC es ${imc}, indica sobrepeso fuera del rango saludable.`;
    } else {
        mensaje = `Tu IMC es ${imc}, indica sobrepeso y obesidad.`;
    }

    // Determinar si hay anemia basado en los niveles de hemoglobina
    if (edad < 6 && hemoglobina < 11.0) {
        mensaje += ` Además, con un nivel de hemoglobina de ${hemoglobina}, se indica anemia.`;
    }

    // Mostrar el mensaje en el textarea
    document.getElementById('IMC').value = mensaje;

    // Actualizar la gráfica
    actualizarGrafica(peso, talla, hemoglobina, imc);
}

// Función para actualizar la gráfica con el IMC calculado
function actualizarGrafica(peso, talla, hemoglobina, imc) {
    let ctx = document.getElementById('graficaPercentil').getContext('2d');

    // Generar datos de percentil simulados
    let edadMeses = [...Array(61).keys()].map(mes => mes - 30); // Edad de -30 a 30 meses
    let percentilData = {
        '-3 SD':edadMeses.map(mes => calculatePercentil(mes, -3)),
        '-2 SD': edadMeses.map(mes => calculatePercentil(mes, -2)),
        '-1 SD': edadMeses.map(mes => calculatePercentil(mes, -1)),
        '0 SD': edadMeses.map(mes => calculatePercentil(mes, 0)),
        '1 SD': edadMeses.map(mes => calculatePercentil(mes, 1)),
        '2 SD': edadMeses.map(mes => calculatePercentil(mes, 2)),
        '3 SD': edadMeses.map(mes => calculatePercentil(mes, 3)),
        'IMC': edadMeses.map(mes => imc) // Usar IMC calculado
    };

    // Función simulada para calcular el percentil, puedes ajustar según tu necesidad
    function calculatePercentil(mes, sd) {
        // Ajusta esta fórmula según tus datos y necesidades
        return sd + (Math.sin(mes / 10) * 2); 
    }

    // Definir los datos para la gráfica
    let data = {
        labels: edadMeses, // Edad en meses
        datasets: [
            {
                label: '-3 SD',
                borderColor: 'black',
                borderWidth: 1,
                data: percentilData['-3 SD'],
                tension: 0.2,
                fill: false,
                pointRadius: 0 // Eliminar puntos
            },
            {
                label: '-2 SD',
                borderColor: 'red',
                borderWidth: 1,
                data: percentilData['-2 SD'],
                tension: 0.2,
                fill: false,
                pointRadius: 0 // Eliminar puntos
            },
            {
                label: '-1 SD',
                borderColor: 'orange',
                borderWidth: 1,
                data: percentilData['-1 SD'],
                tension: 0.2,
                fill: false,
                pointRadius: 0 // Eliminar puntos
            },
            {
                label: '0 SD',
                borderColor: 'green',
                borderWidth: 1,
                data: percentilData['0 SD'],
                tension: 0.2,
                fill: false,
                pointRadius: 0 // Eliminar puntos
            },
            {
                label: '1 SD',
                borderColor: 'orange',
                borderWidth: 1,
                data: percentilData['1 SD'],
                tension: 0.2,
                fill: false,
                pointRadius: 0 // Eliminar puntos
            },
            {
                label: '2 SD',
                borderColor: 'red',
                borderWidth: 1,
                data: percentilData['2 SD'],
                tension: 0.2,
                fill: false,
                pointRadius: 0 // Eliminar puntos
            },
            {
                label: '3 SD',
                borderColor: 'black',
                borderWidth: 1,
                data: percentilData['3 SD'],
                tension: 0.2,
                fill: false,
                pointRadius: 0 // Eliminar puntos
            },
            {
                label: 'IMC',
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                data: percentilData['IMC'],
                borderWidth: 2,
                fill: true,
                pointRadius: 0 // Eliminar puntos
            }
        ]
    };

    // Configuración de las opciones de la gráfica
    let options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Edad (Meses)'
                },
                max: 30,
                min: -30,
               
                ticks: {
                    stepSize: 1
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Percentil'
                },
                max: 3,
                min: -3,
              
                ticks: {
                    stepSize: 1
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
