import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const FacultyPage = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');

    const addFaculty = () => {
        if (name && position && department) {
            const newFaculty = {
                id: Date.now(),
                name,
                position,
                department,
            };
            setFacultyList([...facultyList, newFaculty]);
            setName('');
            setPosition('');
            setDepartment('');
        }
    };

    const deleteFaculty = (id) => {
        setFacultyList(facultyList.filter(faculty => faculty.id !== id));
    };

    const updateFaculty = (id, newName, newPosition, newDepartment) => {
        const updatedList = facultyList.map(faculty => {
            if (faculty.id === id) {
                return {
                    ...faculty,
                    name: newName,
                    position: newPosition,
                    department: newDepartment,
                };
            }
            return faculty;
        });
        setFacultyList(updatedList);
    };

    return (
        <div className="faculty-page content">
            <h1>Faculty</h1>
            <div className="mb-3">
                <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddFaculty" aria-controls="offcanvasAddFaculty">
                    Add Faculty
                </button>
            </div>

            {/* Faculty Table */}
            <div className="faculty-table">
                <h2>Faculty List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facultyList.map(faculty => (
                            <tr key={faculty.id}>
                                <td>{faculty.name}</td>
                                <td>{faculty.position}</td>
                                <td>{faculty.department}</td>
                                <td>
                                    <button className="btn btn-danger me-2" onClick={() => deleteFaculty(faculty.id)}>Delete</button>
                                    <button className="btn btn-secondary" onClick={() => updateFaculty(faculty.id, `${faculty.name} Updated`, `${faculty.position} Updated`, `${faculty.department} Updated`)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Off-Canvas for Adding Faculty */}
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasAddFaculty" aria-labelledby="offcanvasAddFacultyLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasAddFacultyLabel">Add Faculty</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        addFaculty();
                    }}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="position" className="form-label">Position:</label>
                            <input
                                type="text"
                                id="position"
                                className="form-control"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="department" className="form-label">Department:</label>
                            <input
                                type="text"
                                id="department"
                                className="form-control"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Faculty</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FacultyPage;
