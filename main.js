const ctx= document.getElementById('myChart')
const name= ['Carlos', 'Pedro', 'Maria', 'Rosa', 'Juan']
const ages= ['24','10','54','51','15']

const myChart = new Chart(ctx,{
type: 'bar',
data:{
label: 'Edad',
date: ages,
backgroundColor:[
    rgba(255,99,132,0.2) /*ROSA*/,
    rgba(54,162,235,0.2)/* CELESTE*/,
    rgba(255,206,86,0.2)/*AMARILLO*/,
    rgba(75,192,192,0.2)/* MENTA*/,
    rgba(153,102,255,0.2)/*MORADO */,
    rgba(155,159,64,0.2)/*NARANJA*/

],

borderColor:[
    rgba(255,99,132,1) /*ROSA*/,
    rgba(54,162,235,1)/* CELESTE*/,
    rgba(255,206,86,1)/*AMARILLO*/,
    rgba(75,192,192,1)/* MENTA*/,
    rgba(153,102,255,1)/*MORADO */,
    rgba(155,159,64,1)/*NARANJA*/

],
borderWidth:1.5
}
})