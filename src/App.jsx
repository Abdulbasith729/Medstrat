import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import './App.css'
import HospitalImg from './assets/hospital.png'
import Home from './components/Home'
import Address from './components/Address'
import{Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
  <div>

    <Navbar />
      {/* <AppBar style={{ backgroundColor: 'white',borderBottom:'1px solid grey' }} elevation={0}>
        <Toolbar>
          <Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={HospitalImg}
                width={60}
                height={60}
                alt="Hospital Logo"
                style={{  }}
              />
               <h3 style={{ fontSize: '35px', color: 'black',  }}>MedStart</h3> 
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
 */}

<Routes>
<Route path="/" element={ <Home />} />
<Route path="/address/:id" element= {<Address />}/>
</Routes>







      
      </div>
  
  );
}

