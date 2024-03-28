let currentData; // Declare currentData globally to make it accessible across functions

document.addEventListener("DOMContentLoaded", function() {
    // Fetch weather data from the JSON file
    fetch('./api/weatherAPI.json')
        .then(response => response.json())
        .then(data => {
            // Store the fetched data
            currentData = data;
            
            // Process and update weather information with current data by default
            updateWeatherInfo(data.current);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// Function to update the weather information based on the selected data
function updateWeatherInfo(data) {
    // Update current weather information
    document.querySelector('.header-weather-temperature').textContent = data.temp + '°C';
    document.querySelector('.header-weather-info').textContent = data.weather[0].description;

    // Update weather icon
    const iconElement = document.querySelector('.icon i');
    iconElement.className = 'fas fa-sun'; // Default icon, you can replace this with dynamic icon based on weatherIcon

    // Update the DOM elements for daily forecast
    const forecastContainers = document.querySelectorAll('.weather-info .info-box');
    forecastContainers[0].querySelector('.value').textContent = data.feels_like + '°C';
    forecastContainers[1].querySelector('.value').textContent = data.wind_speed + ' m/s';
    forecastContainers[2].querySelector('.value').textContent = data.wind_speed + ' m/s'; // Assuming wind gust is same as wind speed in this example
    forecastContainers[3].querySelector('.value').textContent = data.wind_deg + '°';
    forecastContainers[4].querySelector('.value').textContent = data.humidity + '%';
    forecastContainers[5].querySelector('.value').textContent = data.pressure + ' hPa';

    // Process the max temperature data for chart
    const maxTemperatureData = data.daily.map(day => {
        return { x: new Date(day.dt * 1000), y: day.temp.max };
    });

    // Update the chart with max temperature data
    updateTemperatureChart(maxTemperatureData);
}

// Function to handle button clicks
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function() {
      // Remove 'active' class from all buttons
      document.querySelectorAll('button').forEach(btn => {
          btn.classList.remove('active');
      });

      // Add 'active' class to the clicked button
      this.classList.add('active');
  });
});

// Function to handle "Now" button click
document.getElementById('now').addEventListener('click', function() {
    if (currentData) {
        // Update weather information with current data
        updateWeatherInfo(currentData.current);
    }
});

// Function to handle "Today" button click
document.getElementById('today').addEventListener('click', function() {
    if (currentData) {
        // Update weather information with today's data (first date in daily forecast)
        updateWeatherInfo(currentData.daily[0]);
    }
});

// Function to handle "Select Date" button click
document.getElementById('date').addEventListener('click', function() {
    
});

// Function to update the temperature chart
function updateTemperatureChart(data) {
    
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Temperature"
        },
        data: [{
            type: "line",
            dataPoints: data
        }]
    });

    chart.render();
}


window.onload = function () {
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get dates for the next 6 days
  const next6Days = [];
  for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      next6Days.push(date);
  }

  // Prepare dataPoints with random temperatures
  const dataPoints = [];
  next6Days.forEach(date => {
      const temperature = Math.floor(Math.random() * (50 - 0) + 0); // Random temperature between 0 and 50
      dataPoints.push({ x: date, y: temperature });
  });

  // Create the chart
  var chart = new CanvasJS.Chart("chartContainer", {
      title: {
          text: "Temperature",            
          horizontalAlign: "left",
          verticalAlign: "top",
          margin: 10
      },
      axisX: {
          title: "Date",
          valueFormatString: "DD MMM" 
      },
      axisY: {
          title: "Temperature (°C)",
          minimum: 0,
          maximum: 50
      },
      data: [{
          type: "line",
          dataPoints: dataPoints
      }]
  });

  chart.render();
}

