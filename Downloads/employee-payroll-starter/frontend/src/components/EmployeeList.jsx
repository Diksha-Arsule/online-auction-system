import React, { useEffect, useState } from 'react';
import api from '../api';

export default function EmployeeList(){
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({firstName:'', lastName:'', email:'', designation:'', basicSalary:0, dateOfJoining:''});

  useEffect(()=> { fetch(); }, []);

  function fetch(){
    api.get('/employees').then(res => setEmployees(res.data)).catch(err => console.error(err));
  }

  function submit(e){
    e.preventDefault();
    const body = {...form, basicSalary: Number(form.basicSalary) };
    api.post('/employees', body).then(()=> { setForm({firstName:'', lastName:'', email:'', designation:'', basicSalary:0, dateOfJoining:''}); fetch(); }).catch(err => alert('Error: ' + (err.response?.data?.message || err.message)));
  }

  function remove(id){ api.delete('/employees/'+id).then(()=>fetch()); }

  return (
    <div className="card">
      <h2>Employees</h2>
      <table className="employee-table" aria-label="Employees">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Basic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e, idx)=>(
            <tr key={e.id} className={`employee-row`}>
              <td>{e.id}</td>
              <td>{e.firstName} {e.lastName}</td>
              <td>{e.email}</td>
              <td>{e.designation}</td>
              <td>{e.basicSalary}</td>
              <td className="actions"><button className="btn btn-delete" onClick={()=>remove(e.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{marginTop:18}}>Add employee</h3>
      <form onSubmit={submit}>
        <div className="form-row">
          <input className="" placeholder="First name" value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} required />
          <input placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} />
          <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input placeholder="Designation" value={form.designation} onChange={e=>setForm({...form, designation:e.target.value})} />
          <input placeholder="Basic Salary" type="number" value={form.basicSalary} onChange={e=>setForm({...form, basicSalary:e.target.value})} required />
          <input placeholder="Date of Joining" type="date" value={form.dateOfJoining} onChange={e=>setForm({...form, dateOfJoining:e.target.value})} />
          <button className="btn btn-add" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
