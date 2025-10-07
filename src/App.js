import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState({});

  const addStudent = () => {
    if (name.trim() === "") return;
    setStudents([...students, name]);
    setAttendance({ ...attendance, [name]: false });
    setName("");
  };

  const toggleAttendance = (student) => {
    setAttendance({ ...attendance, [student]: !attendance[student] });
  };

  const totalPresent = Object.values(attendance).filter(Boolean).length;

  return (
    <div className="App">
      <h1>🎓 Student Attendance Manager</h1>

      <div className="input-section">
        <input
          type="text"
          value={name}
          placeholder="Enter student name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>

      <div className="list-section">
        {students.length === 0 ? (
          <p>No students added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student}</td>
                  <td>
                    <button
                      className={attendance[student] ? "present" : "absent"}
                      onClick={() => toggleAttendance(student)}
                    >
                      {attendance[student] ? "Present ✅" : "Absent ❌"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <h3>Total Present: {totalPresent}</h3>
    </div>
  );
}

export default App;
