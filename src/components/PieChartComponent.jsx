import React from 'react';
import { Chart as ChartJS } from 'chart.js';
import { ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartComponent({ data, selectedMonth, chartType }) {
    const regiones = Object.keys(data);
    const valoresMesEspecifico = regiones.map(region => {
        const datosRegion = data[region];
        const valorMes = datosRegion.find(mes => mes[selectedMonth] !== undefined);
        return valorMes ? valorMes[selectedMonth] : 0;
    });

    const data_pie_chart = {
        labels: regiones,
        datasets: [
            {
                label: chartType === 'Ventas' ? '# de Ventas' : '# de Usuarios',
                data: valoresMesEspecifico,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // Rojo
                    'rgba(54, 162, 235, 0.6)', // Azul
                    'rgba(255, 206, 86, 0.6)', // Amarillo
                    'rgba(75, 192, 192, 0.6)', // Verde
                    'rgba(153, 102, 255, 0.6)', // Morado
                    'rgba(255, 159, 64, 0.6)', // Naranja
                    'rgba(25, 99, 132, 0.6)', // Azul oscuro
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(25, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="pie-chart"> {/* Agrega la clase CSS al contenedor del gráfico de pastel */}
            <Pie data={data_pie_chart} />
        </div>
    );
}

export default PieChartComponent;

