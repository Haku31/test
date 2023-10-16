import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import data from '../../public/data.json';
import '../App.css';
import '../styles/Basic.css'
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent';
import PieChartComponent from './PieChartComponent';
import RadarChartComponent from './RadarCharComponent';

function ChartDropdownItem({ type, label, onClick }) {
  return (
    <Dropdown.Item data-type={type} onClick={onClick}>
      {label}
    </Dropdown.Item>
  );
}

function MonthDropdownItem({ month, onClick }) {
  return (
    <Dropdown.Item onClick={onClick}>
      {month}
    </Dropdown.Item>
  );
}

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

function BasicExample() {
  const [selectedMonth, setSelectedMonth] = useState('Enero');
  const [selectedType, setSelectedType] = useState('Grafica de Linea');
  const [chartData, setChartData] = useState('');

  const handleItemClick = (event) => {
    const clickedType = event.target.getAttribute('data-type');
    setSelectedType(clickedType);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleChartDataSelect = (chartType) => {
    setChartData(chartType);
  };

  const dataToSend = chartData === 'Ventas por mes' ? data.datos_ventas : data.datos_usuarios;

  return (
    <div className="container">
      <h1>Visualizacion de datos</h1>
      <div className="chart-type-dropdown" style={{ display: 'inline-block', marginRight: '20px' }}>
        <Dropdown className='drop'>
          <Dropdown.Toggle variant="success" id="chart-type-dropdown">
            {chartData || 'Seleccionar datos'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <ChartDropdownItem type="Ventas por mes" label="Ventas por mes" onClick={() => handleChartDataSelect('Ventas por mes')} />
            <ChartDropdownItem type="Usuarios por mes" label="Usuarios por mes" onClick={() => handleChartDataSelect('Usuarios por mes')} />
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="chart-dropdown" style={{ display: 'inline-block', marginRight: '20px' }}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="chart-dropdown">
            {selectedType || 'Selecciona un tipo de gráfico'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <ChartDropdownItem type="Grafica de Barras" label="Grafica de Barras" onClick={handleItemClick} />
            <ChartDropdownItem type="Grafica de Torta" label="Grafica circular" onClick={handleItemClick} />
            <ChartDropdownItem type="Grafica de Linea" label="Grafica de Linea" onClick={handleItemClick} />
            <ChartDropdownItem type="Grafica de Radar" label="Grafica Radar" onClick={handleItemClick} />
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className='month-dropdown' style={{ display: 'inline-block' }}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="month-dropdown">
            {selectedMonth || 'Selecciona un mes'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {months.map((month, index) => (
              <MonthDropdownItem key={index} month={month} onClick={() => handleMonthSelect(month)} />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {selectedType === 'Grafica de Barras' && (
        <BarChartComponent data={dataToSend} selectedMonth={selectedMonth} chartType={chartData} />
      )}

      {selectedType === 'Grafica de Torta' && (
        <PieChartComponent data={dataToSend} selectedMonth={selectedMonth} chartType={chartData} />
      )}

      {selectedType === 'Grafica de Linea' && (
        <LineChartComponent data={dataToSend} selectedMonth={selectedMonth} chartType={chartData} />
      )}

      {selectedType === 'Grafica de Radar' && (
        <RadarChartComponent data={dataToSend} selectedMonth={selectedMonth} chartType={chartData} />
      )}
    </div>
  );
}

export default BasicExample;


