import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("students"));
    if (saved) setStudents(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    if (!name.trim() || !roll.trim()) return alert("Enter all fields!");
    const newStudent = {
      id: Date.now(),
      name,
      roll,
      status: "Not Marked",
    };
    setStudents([...students, newStudent]);
    setName("");
    setRoll("");
  };

  const markAttendance = (id, status) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, status } : s
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const resetAttendance = () => {
    setStudents(
      students.map((s) => ({ ...s, status: "Not Marked" }))
    );
  };

  return (
    <div className="app">
      <h1>🎓 Student Attendance Manager</h1>

      <div className="add-box">
        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>

      <div className="controls">
        <button onClick={resetAttendance}>Reset Attendance</button>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4">No students added yet.</td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id}>
                  <td>{s.roll}</td>
                  <td>{s.name}</td>
                  <td
                    className={
                      s.status === "Present"
                        ? "present"
                        : s.status === "Absent"
                        ? "absent"
                        : ""
                    }
                  >
                    {s.status}
                  </td>
                  <td>
                    <button
                      className="present-btn"
                      onClick={() => markAttendance(s.id, "Present")}
                    >
                      Present
                    </button>
                    <button
                      className="absent-btn"
                      onClick={() => markAttendance(s.id, "Absent")}
                    >
                      Absent
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteStudent(s.id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
