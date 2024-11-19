function getLocation() {
    if (navigator.geolocation && navigator.permissions) {
        navigator.permissions.query({name: 'geolocation'}).then(function(permissionStatus) {
            if (permissionStatus.state === 'granted') {
                // Permission was already granted; get the position without prompting
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else if (permissionStatus.state === 'prompt') {
                // Permission has not been granted yet; request it
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else if (permissionStatus.state === 'denied') {
                // Permission was denied; do not request it again
                document.getElementById("location").innerHTML = "User has denied the request for Geolocation.";
            }
        });
    } else if (navigator.geolocation) {
        // Fallback for browsers that do not support the Permissions API
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("location").innerHTML =
        "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "An unknown error occurred.";
            break;
    }
}
