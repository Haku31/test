import React from 'react';
import ChartJS from 'chart.js/auto';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChartComponent({ data, selectedMonth, chartType }) {
  const regiones = Object.keys(data);
  const valoresMesEspecifico = regiones.map(region => {
    const datosRegion = data[region];
    const valorMes = datosRegion.find(mes => mes[selectedMonth] !== undefined);
    return valorMes ? valorMes[selectedMonth] : 0;
  });

  // Paleta de colores suaves
  const colors = [
    'rgba(75, 192, 192, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(44, 123, 182, 1)',
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };

  const labels = regiones;

  const borderColor = colors[0]; // Puedes cambiar el índice para seleccionar otro color
  const backgroundColor = colors[1]; // Puedes cambiar el índice para seleccionar otro color

  const data_line_chart = {
    labels,
    datasets: [
      {
        label: chartType === 'Ventas por mes' ? 'Ventas por ciudad' : 'Usuarios por ciudad',
        data: valoresMesEspecifico,
        height: 200,
        borderColor,
        backgroundColor,
      },
    ],
  };

  return (
    <div className="line-chart"> {/* Aplica la clase CSS al contenedor */}
       <Line options={options} data={data_line_chart} />
    </div>
  );


}

export default LineChartComponent;
