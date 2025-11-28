import React from 'react';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="card">
        <h1>Employee Payroll - Demo</h1>
        <p className="muted small">A simple demo to manage employees (frontend + Spring Boot backend)</p>
      </div>
      <EmployeeList />
    </div>
  );
}

export default App;
