export const getCenter = (data) => {
    var bound = new window.google.maps.LatLngBounds(); 
    
    data.map(row =>
        bound.extend(new window.google.maps.LatLng(row.lat, row.lng) )
    )

    return bound.getCenter();
};
