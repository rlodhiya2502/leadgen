
document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Capture form data and send to backend
    const formData = new FormData(event.target);
    fetch('submit-lead.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          alert('Lead submitted successfully!');
      }).catch(error => {
          console.error('Error:', error);
      });
});

// Geolocation API to capture location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        // You can send this data to the backend if needed
    });
}