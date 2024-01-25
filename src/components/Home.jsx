import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GeoApi = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:78.44202,17.3707564,5000&bias=proximity:78.44202,17.3707564&limit=20&apiKey=c50532e60baa432b93d0136df04ef351`;

const Home = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GeoApi);
        const data = await response.json();
        const extractedHospitals = data.features.map((feature, index) => ({
          id: index, 
          name: feature.properties.name,
          address: feature.properties.formatted,
          lat: feature.properties.lat,
          lon: feature.properties.lon,
          category: feature.properties.categories,
          city: feature.properties.city,
        }));
        setHospitals(extractedHospitals);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = (hospital) => {
    navigate(`/address/${hospital.id}`, { state: hospital });
  };

  return (
    <Container>
      <Typography variant="h4" style={{ fontSize: '25px', marginTop: '100px' }}>
        Hospitals Near You
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error fetching data: {error.message}</Typography>}
      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(3,1fr)',
          marginTop: 20,
          cursor: 'pointer',
        }}
      >
        {hospitals.map((hospital) => (
          <Card
            key={hospital.id}
            sx={{
              minWidth: 275,
              marginBottom: 2,
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
            onClick={() => handleClick(hospital)}
          >
            <CardContent>
              <Typography variant="h6" component="div" style={{ marginBottom: 10, borderBottom: '1px solid grey' }}>
                {hospital.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hospital.address}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ marginTop: 10 }}>
                City: {hospital.city}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Home;
