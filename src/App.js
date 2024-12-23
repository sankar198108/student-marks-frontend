import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [hallTicketNumber, setHallTicketNumber] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [marksDetails, setMarksDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!hallTicketNumber.trim()) {
      setError('Please enter a valid Hall Ticket Number');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/students/${hallTicketNumber.trim()}`);
      setStudentDetails(response.data.student);
      setMarksDetails(response.data.marks);
    } catch (err) {
      setError('Error fetching data. Please ensure the Hall Ticket Number is correct.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1>Krishnaveni Degree College (Autonomous)</h1>
        <h2>Semester Results</h2>
        <img src="/logo.png" alt="College Logo" className="college-logo" />
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Hall Ticket Number"
          value={hallTicketNumber}
          onChange={(e) => setHallTicketNumber(e.target.value)}
          className="hall-ticket-input"
        />
        <button onClick={handleSubmit} className="submit-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <button onClick={() => window.print()} className="print-button">Print</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {studentDetails && (
        <table>
          <thead>
            <tr>
              <th colSpan="4" className="table-heading">Student Details</th>
            </tr>
            <tr>
              <th>Hall Ticket Number</th>
              <th>Student Name</th>
              <th>College Name</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{studentDetails.hall_ticket}</td>
              <td>{studentDetails.name}</td>
              <td>{studentDetails.college}</td>
              <td>{studentDetails.course}</td>
            </tr>
          </tbody>
        </table>
      )}

      {marksDetails && (
        <table>
          <thead>
            <tr>
              <th colSpan="7" className="table-heading">Marks Details</th>
            </tr>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>External Marks</th>
              <th>External Flag</th>
              <th>Internal Marks</th>
              <th>Internal Flag</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {marksDetails.map((marks, index) => (
              <tr key={index}>
                <td>{marks.subject_code}</td>
                <td>{marks.subject_name}</td>
                <td>{marks.external_marks}</td>
                <td>{marks.external_flag === 'P' ? 'P' : 'F'}</td>
                <td>{marks.internal_marks}</td>
                <td>{marks.internal_flag === 'P' ? 'P' : 'F'}</td>
                <td>{marks.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <footer className="footer">&copy; 2024 Krishnaveni Degree College (Autonomous). All Rights Reserved.</footer>
    </div>
  );
};

export default App;
