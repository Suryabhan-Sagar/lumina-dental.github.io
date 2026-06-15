/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';

// Layout

import { Layout } from './components/layout/Layout';

// Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { NewPatients } from './pages/NewPatients';
import { Reviews } from './pages/Reviews';
import { Gallery } from './pages/Gallery';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { AppointmentHistory } from './pages/AppointmentHistory';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<About />} />
              <Route path="new-patients" element={<NewPatients />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="appointment-history" element={<AppointmentHistory />} />
              <Route path="admin" element={<Admin />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              
              {/* Fallback component could go here, but redirecting to home is fine for now */}
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
