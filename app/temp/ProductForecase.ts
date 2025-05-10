import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

const ProductForecast = ({ productId, historicalData }: { productId: number, historicalData: number[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [forecastData, setForecastData] = useState<string[] | null>(null);
  const [chartData, setChartData] = useState(null);
  
  // Generate labels for the chart (dates)
  const generateDateLabels = (historicalLength: number, forecastLength: number) => {
    const today = new Date();
    const labels = [];
    
    // Historical dates (past)
    for (let i = historicalLength - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    // Forecast dates (future)
    for (let i = 1; i <= forecastLength; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    return labels;
  };

  // Fetch forecast data
  const fetchForecast = async () => {
    if (!historicalData || historicalData.length === 0) {
      setError('No historical data available');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Get the recent data for the forecast (last 30 points or all if less)
      const lookbackWindow = 30;
      const recentData = historicalData.slice(-lookbackWindow);
      
      // Make API call to get forecast
      // const response = await axios.post('/api/forecast/predict', {
      //   recentData,
      //   options: {
      //     forecastHorizon: 7 // Predict 7 days ahead
      //   }
      // });
      const 
      
      if (response.data.success) {
        setForecastData(response.data.forecast);
        
        // Prepare data for the chart
        const labels = generateDateLabels(historicalData.length, response.data.forecast.length);
        
        setChartData({
          labels,
          datasets: [
            {
              label: 'Historical Data',
              data: [...historicalData, ...Array(response.data.forecast.length).fill(null)],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1
            },
            {
              label: 'Forecast',
              data: [...Array(historicalData.length).fill(null), ...response.data.forecast],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderDash: [5, 5],
              tension: 0.1
            }
          ]
        });
      } else {
        setError(response.data.error || 'Failed to get forecast');
      }
    } catch (err: { message: string }) {
      setError(err.message || 'Error fetching forecast');
      console.error('Error fetching forecast:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch forecast when component mounts or data changes
  useEffect(() => {
    if (historicalData && historicalData.length > 0) {
      fetchForecast();
    }
  }, [productId, historicalData]);
  
  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Sales Forecast',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const datasetLabel = context.dataset.label || '';
            const value = context.raw !== null ? context.raw.toFixed(2) : 'No data';
            return `${datasetLabel}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Units'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  return (
    <div className="product-forecast">
      <h2>Product Forecast</h2>
      
      {isLoading && <div className="loading">Loading forecast data...</div>}
      
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchForecast}>Retry</button>
        </div>
      )}
      
      {chartData && !isLoading && !error && (
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
          
          <div className="forecast-summary">
            <h3>7-Day Forecast</h3>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Forecasted Units</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((value, index) => (
                  <tr key={index}>
                    <td>{chartData.labels[historicalData.length + index]}</td>
                    <td>{value.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="actions">
        <button 
          onClick={() => fetchForecast()} 
          disabled={isLoading || !historicalData}
        >
          Refresh Forecast
        </button>
      </div>
    </div>
  );
};

export default ProductForecast;
