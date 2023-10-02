import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Chart.js configuration
    const data = { 
      labels: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
      datasets: [
        {
          label: 'Ouiouiman',
          data: [0],
          borderColor: 'rgba(0, 125, 255, 1)',
          borderWidth: 2,
        },
        {
          label: 'PrivateMerc',
          data: [0],
          borderColor: 'rgba(255, 31, 0, 1)',
          borderWidth: 2,
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: true,
    };

    // Create the chart
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }, []);

  return (
    <div 
      class="chart-container"
      style={{position: 'relative', height:'50vh', width:'50vw', padding: '15px'}}
    >
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;