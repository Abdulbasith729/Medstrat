import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import HospitalImg from '../assets/hospital.png';

export default function Navbar() {
  return (
    <div style={{ marginBottom: '50px' }}>
      <AppBar style={{ backgroundColor: 'white', borderBottom: '1px solid grey' }} elevation={0}>
        <Toolbar>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={HospitalImg}
              width={60}
              height={60}
              alt="Hospital Logo"
              style={{ marginRight: '10px' }} // Added margin for better spacing
            />
            <Typography variant="h3" style={{ color: 'black',fontSize: '35px', }}>
              MedStart
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
