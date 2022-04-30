function getUserCoordinates() {
	navigator.geolocation.getCurrentPosition(
		(pos) => {
			const coordinates = pos.coords.latitude + ", " + pos.coords.longitude;
			coords_inp.value = coordinates;
		},
		(err) => {
			console.error(err);
		})
}

// https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=1&sort=-dist&geofilter.distance=44.68273511919472%2C-101.763422595277%2C2648000

function getOppositeCoords(latitude, longitude) {
	const oppLat = - Number(latitude);
	const oppLong = longitude > 0 ? - (180 - Number(longitude)) : 180 + Number(longitude);
	return [oppLat, oppLong];
}

function takeMeToTheOtherSide() {
	const latitude = latInput.value;
	const longitude = longInput.value;
	const oppositeCoords = getOppositeCoords(latitude, longitude);
}

function start() {
	menu_screen.scrollIntoView({block: "center", behavior: "smooth"});
}

function confirmSettings() {
	let coordinates = coords_inp.value;
	const [lat, long] = coordinates.split(", ");
	const [oppLat, oppLong] = getOppositeCoords(lat, long);
	const url = "https://maps.google.com/maps?q=" + oppLat + ", " + oppLong + "&t=k&z=5&output=embed";
	output_iframe.src = url;
	image_bottom.scrollIntoView({block: "end", behavior: "smooth"});
}

window.addEventListener('unload', function(e){
   window.scrollTo(0, 0);
});