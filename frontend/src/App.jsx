import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateUser from './pages/CreateUser';
import UserDetails from './pages/UserDetails';
import EditUser from './pages/EditUser';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;