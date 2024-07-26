import React, { useState, useEffect } from 'react';

const SemesterPage = () => {
    const [semesters, setSemesters] = useState([]);
    const [semesterName, setSemesterName] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentSemesterId, setCurrentSemesterId] = useState(null);

    useEffect(() => {
        const initialSemesters = Array.from({ length: 8 }, (_, index) => ({
            id: index + 1,
            name: `Semester ${index + 1}`
        }));
        setSemesters(initialSemesters);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            setSemesters(semesters.map(sem => (sem.id === currentSemesterId ? { ...sem, name: semesterName } : sem)));
            setEditMode(false);
            setCurrentSemesterId(null);
        } else {
            if (semesters.some(sem => sem.name === semesterName)) {
                alert('Semester already exists');
                return;
            }
            const newSemester = { id: Date.now(), name: semesterName };
            setSemesters([...semesters, newSemester]);
        }
        setSemesterName('');
    };

    const handleDelete = (id) => {
        setSemesters(semesters.filter(sem => sem.id !== id));
    };

    const handleEdit = (id) => {
        const semesterToEdit = semesters.find(sem => sem.id === id);
        setSemesterName(semesterToEdit.name);
        setEditMode(true);
        setCurrentSemesterId(id);
    };

    return (
        <div className="semester-page content">
            <h1>Manage Semesters</h1>
            <div className="mb-3">
                <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSemester" aria-controls="offcanvasSemester">
                    {editMode ? 'Edit Semester' : 'Add Semester'}
                </button>
            </div>
            <div className="semester-table">
                <h2>Semesters List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semesters.map((sem) => (
                            <tr key={sem.id}>
                                <td>{sem.name}</td>
                                <td>
                                    <button className="btn btn-danger me-2" onClick={() => handleDelete(sem.id)}>Delete</button>
                                    <button className="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSemester" onClick={() => handleEdit(sem.id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasSemester" aria-labelledby="offcanvasSemesterLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasSemesterLabel">{editMode ? 'Edit Semester' : 'Add Semester'}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="semesterName" className="form-label">Semester Name:</label>
                            <input
                                type="text"
                                id="semesterName"
                                className="form-control"
                                value={semesterName}
                                onChange={(e) => setSemesterName(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">{editMode ? 'Update Semester' : 'Add Semester'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SemesterPage;
