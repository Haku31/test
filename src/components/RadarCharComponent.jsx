import React from 'react';
import ChartJS from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import {
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

function RadarChartComponent({ data, selectedMonth, chartType }) {
    const regiones = Object.keys(data);
    const valoresMesEspecifico = regiones.map(region => {
        const datosRegion = data[region];
        const valorMes = datosRegion.find(mes => mes[selectedMonth] !== undefined);
        return valorMes ? valorMes[selectedMonth] : 0;
    });

    // Define los rangos según el tipo de gráfica
    const suggestedMin = chartType === 'Ventas' ? 5000 : 10;
    const suggestedMax = chartType === 'Ventas' ? 45000 : 400;

    const data_radar_chart = {
        labels: regiones,
        datasets: [
            {
                label: chartType === 'Ventas' ? '# de Ventas' : '# de Usuarios',
                data: valoresMesEspecifico,
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                suggestedMin: suggestedMin,
                suggestedMax: suggestedMax,
            },
        },
    };
    return (
        <div className="radar-chart"> {/* Agrega la clase CSS al contenedor del gráfico de pastel */}
             <Radar data={data_radar_chart} options={options} />;
        </div>
    );


}

export default RadarChartComponent;
