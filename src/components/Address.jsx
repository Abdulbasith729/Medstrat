import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

function Address() {
  const location = useLocation();
  const [userLocation, setUserLocation] = useState({});
  const [userAddress, setUserAddress] = useState('');
  const [directions, setDirections] = useState([]);
  const { name, address, lat, lon, category, city } = location.state;

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        if ('geolocation' in navigator) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          // Get user's address using reverse geocoding
          const reverseGeocodeApi = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=2c2016c8564549228c0144cf565701f7`;
          const response = await fetch(reverseGeocodeApi);
          const data = await response.json();

          // Assuming the first result contains the address
          if (data.results && data.results.length > 0) {
            setUserAddress(data.results[0].formatted);
          
          }
        }
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    fetchUserLocation();
  }, [lat, lon]);

  return (
    <div style={{ marginTop: '100px' }}>
      <Card style={{ width: '50%' }}>
        <CardContent>
          <Typography variant="h6" component="div" style={{ marginBottom: '50px', borderBottom: '1px solid grey', textAlign: 'center', fontSize: '30px' }}>
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary" style={{ marginBottom: '50px', borderBottom: '1px solid grey', fontSize: '20px', color: 'black' }}>
            User's Lat: {userLocation.lat}
            <br />
            User's Long: {userLocation.lng}
            <br />
            User's Address: {userAddress}
          </Typography>

          <Typography variant="body2" color="text.secondary" style={{ marginBottom: '50px', color: 'black', borderBottom: '1px solid grey', fontSize: '20px' }}>
            Hospital's Lat: {lat}
            <br />
            Hospital's Long: {lon}
            <br />
            Hospital's Address: {address}
          </Typography>

          <Typography variant="body2" color="text.secondary" style={{ marginBottom: '50px', color: 'black', fontSize: '20px' }}>
            Category: {category}
            <br />
            State: {city}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Address;
