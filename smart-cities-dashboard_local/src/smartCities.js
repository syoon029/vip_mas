// URL to fetch CSV data from a specific Google Sheet
const sheetUrl = "https://docs.google.com/spreadsheets/d/1UvSq9wRiA2F6GlUyKUQivM-ihpSUL-iJsTrQoxjSX1M/gviz/tq?tqx=out:csv&sheet=Form";

// Variable to hold the complaints chart instance
let complaintsChart = null;

// Load the Google Charts library, specifying the required package ('corechart')
google.charts.load('current', {'packages':['corechart']});
// Set a callback to initialize the application once the library is loaded
google.charts.setOnLoadCallback(initializeApp);

// Main application initialization function
async function initializeApp() {
  // Load authentication credentials
  const auth = await loadAuth();
  // Fetch data and create the complaints chart
  fetchDataAndCreateChart(auth);
}

// Function to load authentication credentials for accessing Google Sheets API
async function loadAuth() {
  // Fetch the JSON key file containing service account credentials
  const response = await fetch('smart-cities-edit-1-f229886f6c17.json');
  const key = await response.json();

  // Return a Google JWT client for authentication
  return new google.auth.JWT(
    key.client_email, // Service account email
    null, // Key file path (not used here)
    key.private_key, // Private key
    ['https://www.googleapis.com/auth/spreadsheets.readonly'] // Required scope
  );
}

// Fetch data from the Google Sheet and create a line chart of daily complaints
async function fetchDataAndCreateChart(auth) {
  // Initialize the Google Sheets API client
  const sheets = google.sheets({version: 'v4', auth});
  const spreadsheetId = '1UvSq9wRiA2F6GlUyKUQivM-ihpSUL-iJsTrQoxjSX1M'; // ID of the spreadsheet
  const range = 'Form!A:B'; // Range of data to retrieve

  try {
    // Fetch the data from the specified range in the spreadsheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    const rows = response.data.values; // Extract rows of data
    if (rows.length) {
      // Process timestamps from the data (column A)
      const timestamps = rows.slice(1).map(row => new Date(row[0]));
      const dailyCounts = {}; // Object to hold counts of complaints per day

      // Count complaints by date
      timestamps.forEach(date => {
        const dateString = date.toLocaleDateString();
        dailyCounts[dateString] = (dailyCounts[dateString] || 0) + 1;
      });

      // Sort dates and prepare data for the chart
      const labels = Object.keys(dailyCounts).sort((a, b) => new Date(a) - new Date(b));
      const values = labels.map(date => dailyCounts[date]);

      // Create a line chart using Chart.js
      const ctx = document.getElementById('complaintsChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels, // X-axis labels (dates)
          datasets: [{
            label: 'Daily Complaints',
            data: values, // Y-axis data (complaint counts)
            fill: true,
            backgroundColor: 'rgba(142, 180, 255, 0.3)',
            borderColor: 'rgba(90, 90, 255, 0.8)',
            tension: 0.4 // Smooth curves between points
          }]
        },
        options: {
          responsive: true, // Chart adjusts to container size
          plugins: {
            legend: { display: false }, // Hide the legend
            title: {
              display: true,
              text: 'Daily Complaints Tracker' // Chart title
            }
          },
          scales: {
            x: {
              type: 'time', // Use time scale for the X-axis
              time: {
                unit: 'day',
                tooltipFormat: 'MMM d, yyyy', // Format for tooltip
                displayFormats: {
                  day: 'MMM d, yyyy' // Format for X-axis labels
                }
              }
            },
            y: {
              beginAtZero: true, // Y-axis starts at 0
              suggestedMax: Math.max(...values) + 5 // Adjust max for padding
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error); // Log any errors
  }
}

// Initialize a map with predefined complaint locations
function initMap() {
  const mapOptions = {
    zoom: 12, // Initial zoom level
    center: { lat: 33.9105, lng: -84.2222 }, // Center coordinates
  };
  const map = new google.maps.Map(document.getElementById('map'), mapOptions); // Create the map

  // Define locations to mark on the map
  const locations = [
    { position: { lat: 33.9239, lng: -84.2186 }, label: "Best Friend Rd" },
    { position: { lat: 33.9349, lng: -84.2022 }, label: "Traffic Lights (1)" },
    { position: { lat: 33.9163, lng: -84.2116 }, label: "Arrowind" },
  ];

  // Add markers for each location
  locations.forEach(location => {
    const marker = new google.maps.Marker({
      position: location.position,
      map: map,
      title: location.label, // Tooltip text
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Custom marker icon
      },
    });

    // Create an info window with location details
    const infoWindow = new google.maps.InfoWindow({
      content: `<p>${location.label}</p>`,
    });

    // Add click event to open the info window
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });
}

// Call the functions when the page loads
window.onload = () => {
  fetchDataAndCreateChart(); // Create the chart
  initMap(); // Initialize the map
};
