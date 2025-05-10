import axios from "axios";

// Configuration
const FORECAST_SERVICE_URL =
  process.env.FORECAST_SERVICE_URL || "http://localhost:5000";

/**
 * Service for interacting with the Python LSTM forecasting service
 */
/**
 * Train the LSTM model with historical product data
 *
 * @param {Array} timeSeriesData - Array of numerical values representing historical product data
 * @param {Object} options - Training parameters
 * @param {Number} options.lookback - Number of previous time steps to use for predictions
 * @param {Number} options.forecastHorizon - Number of future time steps to predict
 * @param {Number} options.epochs - Number of training epochs
 * @returns {Promise} - Result of the training operation
 */
export const trainModel = async (timeSeriesData, options = {}) => {
  try {
    const response = await axios.post(`${FORECAST_SERVICE_URL}/api/train`, {
      data: timeSeriesData,
      params: {
        lookback: options.lookback || 30,
        forecast_horizon: options.forecastHorizon || 7,
        epochs: options.epochs || 50,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error training forecast model:", error);
    throw new Error(`Failed to train forecast model: ${error.message}`);
  }
};

/**
 * Generate forecast for a product
 *
 * @param {Array} recentData - Recent time series data (should match the lookback window)
 * @param {Object} options - Forecast parameters
 * @param {Number} options.forecastHorizon - Number of future time steps to predict
 * @returns {Promise} - Forecast results
 */
export const generateForecast = async (recentData, options = {}) => {
  try {
    const response = await axios.post(`${FORECAST_SERVICE_URL}/api/forecast`, {
      data: recentData,
      params: {
        forecast_horizon: options.forecastHorizon || 7,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error generating forecast:", error);
    throw new Error(`Failed to generate forecast: ${error.message}`);
  }
};
