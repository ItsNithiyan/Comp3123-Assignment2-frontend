import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

function EmployeeList() {
  const { logout } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({ department: '', position: '' });
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get('/employees');
      setEmployees(res.data);
    } catch {
      setError('Failed to fetch employees.');
    } finally {
      setLoading(false);
    }
  };

  const searchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get('/employees/search', { params: searchParams });
      setEmployees(res.data);
    } catch {
      setError('Failed to search employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) =>
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });

  const handleLogout = () => logout();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Employee List</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <form style={styles.form} onSubmit={(e) => { e.preventDefault(); searchEmployees(); }}>
        <input
          type="text"
          name="department"
          value={searchParams.department}
          onChange={handleChange}
          placeholder="Department"
          style={styles.input}
        />
        <input
          type="text"
          name="position"
          value={searchParams.position}
          onChange={handleChange}
          placeholder="Position"
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>Search</button>
          <button type="button" onClick={fetchEmployees} style={styles.button}>
            Reset
          </button>
        </div>
      </form>

      <div style={styles.addButton}>
        <a href="/employees/add" style={styles.link}>
          Add New Employee
        </a>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={styles.list}>
          {employees.map((employee) => (
            <li key={employee._id} style={styles.listItem}>
              <h3>{employee.name}</h3>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Position:</strong> {employee.position}</p>
              <p><strong>Salary:</strong> ${employee.salary}</p>
              <div>
                <a href={`/employees/edit/${employee._id}`} style={styles.link}>
                  Edit
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: { 
    padding: '20px', 
    maxWidth: '800px', 
    margin: '0 auto', 
    backgroundColor: '#87CEEB',  // Sky blue background
    borderRadius: '8px', 
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' 
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  logoutButton: { background: 'red', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer' },
  error: { backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' },
  input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px' },
  buttonGroup: { display: 'flex', gap: '10px' },
  button: { padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: '#007BFF', color: 'white' },
  addButton: { marginBottom: '20px' },
  link: { textDecoration: 'none', color: '#007BFF' },
  list: { listStyle: 'none', padding: 0 },
  listItem: { border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '10px' },
};

export default EmployeeList;
