import React from 'react';
import ChartJS from 'chart.js/auto';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChartComponent({ data, selectedMonth, chartType }) {
  const regiones = Object.keys(data);
  const valoresMesEspecifico = regiones.map((region) => {
    const datosRegion = data[region];
    const valorMes = datosRegion.find((mes) => mes[selectedMonth] !== undefined);
    return valorMes ? valorMes[selectedMonth] : 0;
  });

  const colores = regiones.map(() => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
  });

  const datasets = [
    {
      label: `#${chartType}`,
      data: valoresMesEspecifico,
      backgroundColor: colores,
    },
  ];

  // Define los rangos según el tipo de gráfica
  const suggestedMin = chartType === 'Ventas' ? 5000 : 10;
  const suggestedMax = chartType === 'Ventas' ? 45000 : 400;

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
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: suggestedMin,
        suggestedMax: suggestedMax,
      },
    },
  };

  const labels = regiones;
  const data_bar_chart = {
    labels: labels,
    datasets: datasets,
  };
  return (
    <div className="line-chart"> {/* Aplica la clase CSS al contenedor */}
        <Bar data={data_bar_chart} options={options} />;
    </div>
  );

}

export default BarChartComponent;
