let map;
let currentPosition;
let markers = [];
let searchRadius = 500;

function initMap() {
    const pangyo = new naver.maps.LatLng(37.3947, 127.1111);
    const mapOptions = {
        center: pangyo,
        zoom: 15
    };
    map = new naver.maps.Map('map', mapOptions);
    currentPosition = pangyo;
    searchRestaurants(pangyo.lat(), pangyo.lng());
    updateCurrentLocationText(pangyo.lat(), pangyo.lng());
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            currentPosition = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(currentPosition);
            searchRestaurants(currentPosition.lat(), currentPosition.lng());
            updateCurrentLocationText(currentPosition.lat(), currentPosition.lng());
        }, () => {
            alert('위치 정보를 가져올 수 없습니다.');
        });
    } else {
        alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
    }
}

function searchRestaurants(lat, lng) {
    clearMarkers();
    fetch(`/api/restaurants`)
        .then(response => response.json())
        .then(restaurants => {
            const filteredRestaurants = filterRestaurantsByDistance(restaurants, lat, lng, searchRadius);
            displayRestaurants(filteredRestaurants);
            addMarkersToMap(filteredRestaurants);
        })
        .catch(error => console.error('Error:', error));
}

function filterRestaurantsByDistance(restaurants, lat, lng, radius) {
    const currentLocation = new naver.maps.LatLng(lat, lng);
    return restaurants.filter(restaurant => {
        const restaurantLocation = new naver.maps.LatLng(restaurant.lat, restaurant.lng);
        const distance = map.getProjection().getDistance(currentLocation, restaurantLocation);
        restaurant.distance = Math.round(distance);
        return distance <= radius;
    });
}

function displayRestaurants(restaurants) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = '';
    restaurants.forEach(restaurant => {
        const restaurantElement = document.createElement('a');
        restaurantElement.className = 'restaurant-item';
        restaurantElement.href = `/restaurant/${restaurant.id}`;
        
        const mainImage = restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : '/static/default-image.jpg';

        restaurantElement.innerHTML = `
            <img src="${mainImage}" alt="${restaurant.name}" class="restaurant-image">
            <h3 class="restaurant-name">${restaurant.name}</h3>
            <p class="restaurant-distance">거리: ${restaurant.distance}m</p>
        `;
        resultsSection.appendChild(restaurantElement);
    });
}

function addMarkersToMap(restaurants) {
    restaurants.forEach(restaurant => {
        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(restaurant.lat, restaurant.lng),
            map: map
        });

        const infoWindow = new naver.maps.InfoWindow({
            content: `
                <div style="padding:10px;min-width:200px;">
                    <h4>${restaurant.name}</h4>
                    <p>거리: ${restaurant.distance}m</p>
                </div>
            `
        });

        naver.maps.Event.addListener(marker, "click", function(e) {
            if (infoWindow.getMap()) {
                infoWindow.close();
            } else {
                infoWindow.open(map, marker);
            }
        });

        markers.push(marker);
    });
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

function updateSearchRadius() {
    const radiusSelect = document.getElementById('search-radius');
    searchRadius = parseInt(radiusSelect.value);
    if (currentPosition) {
        searchRestaurants(currentPosition.lat(), currentPosition.lng());
    }
}

function updateCurrentLocationText(lat, lng) {
    const locationText = document.getElementById('current-location');
    if (locationText) {
        if (lat === 37.3947 && lng === 127.1111) {
            locationText.textContent = '현재 위치: 판교역';
        } else {
            locationText.textContent = `현재 위치: 위도 ${lat.toFixed(4)}, 경도 ${lng.toFixed(4)}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    document.getElementById('my-location').addEventListener('click', getCurrentLocation);
    document.getElementById('search-radius').addEventListener('change', updateSearchRadius);
});