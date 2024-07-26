import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const SubjectTeacherPage = () => {
    const [teachersBySemester, setTeachersBySemester] = useState({});
    const [semester, setSemester] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!semester) return alert('Please select a semester');

        const newTeacher = {
            id: Date.now(),
            name,
            contact,
        };

        const updatedTeachers = {
            ...teachersBySemester,
            [semester]: teachersBySemester[semester] ? [...teachersBySemester[semester], newTeacher] : [newTeacher],
        };

        setTeachersBySemester(updatedTeachers);
        setName('');
        setContact('');
    };

    const deleteTeacher = (semester, id) => {
        const updatedTeachers = {
            ...teachersBySemester,
            [semester]: teachersBySemester[semester].filter(teacher => teacher.id !== id),
        };
        setTeachersBySemester(updatedTeachers);
    };

    return (
        <div className="subject-teacher-page content">
            <h1>Subject Teachers</h1>
            <div className="teacher-form">
                <h2>Add Teacher</h2>
                <button className="btn btn-primary mb-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddTeacher" aria-controls="offcanvasAddTeacher">
                    Add Teacher
                </button>
            </div>

            <div className="semester-teachers">
                {Object.keys(teachersBySemester).map(sem => (
                    <div key={sem} className="semester-data">
                        <h2>Semester {sem}</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachersBySemester[sem].map((teacher) => (
                                    <tr key={teacher.id}>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.contact}</td>
                                        <td><button className="btn btn-danger" onClick={() => deleteTeacher(sem, teacher.id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasAddTeacher" aria-labelledby="offcanvasAddTeacherLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasAddTeacherLabel">Add Teacher</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
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
                            <label htmlFor="contact" className="form-label">Contact:</label>
                            <input
                                type="text"
                                id="contact"
                                className="form-control"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Teacher</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubjectTeacherPage;
