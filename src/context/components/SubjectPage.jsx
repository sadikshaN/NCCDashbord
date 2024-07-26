import React, { useContext, useState, useEffect } from 'react';
import { SubjectsContext } from '../context/SubjectsContext';
import { SemesterContext } from '../context/SemesterContext';

const SubjectPage = () => {
    const { subjects, setSubjects, addSubject } = useContext(SubjectsContext);
    const { semesters } = useContext(SemesterContext);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [editSubjectId, setEditSubjectId] = useState(null);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newSubjectCode, setNewSubjectCode] = useState('');
    const [newSubjectCredits, setNewSubjectCredits] = useState('');

    useEffect(() => {
        if (semesters.length > 0) {
            setSelectedSemester(semesters[0].id);
        }
    }, [semesters]);

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const handleAddSubjects = (e) => {
        e.preventDefault();
        const newName = e.target.elements.subjectName.value;
        const newCode = e.target.elements.subjectCode.value;
        const newCredits = e.target.elements.subjectCredits.value;

        if (newName && selectedSemester && newCode && newCredits) {
            addSubject(selectedSemester, newName, newCode, newCredits);
            e.target.reset();
        }
    };

    const deleteSubject = (semester, id) => {
        const updatedSubjects = { ...subjects };
        updatedSubjects[semester] = updatedSubjects[semester].filter(subject => subject.id !== id);
        setSubjects(updatedSubjects);
    };

    const editSubject = (semester, id, newName, newCode, newCredits) => {
        const updatedSubjects = { ...subjects };
        const subjectToUpdate = updatedSubjects[semester].find(subject => subject.id === id);
        if (subjectToUpdate) {
            subjectToUpdate.name = newName;
            subjectToUpdate.code = newCode;
            subjectToUpdate.credits = newCredits;
            setSubjects(updatedSubjects);
            setEditSubjectId(null);
            setNewSubjectName('');
            setNewSubjectCode('');
            setNewSubjectCredits('');
        }
    };

    return (
        <div className="subjectPage content">
            <h1>Manage Subjects</h1>
            <div className="mb-3">
                <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddSubject" aria-controls="offcanvasAddSubject">
                    Add Subject
                </button>
            </div>
            <div className="semester-tables">
                {Object.keys(subjects).map(semester => (
                    <div className="semesterSubjects mb-4" key={semester}>
                        <h2>Semester {semester}</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Course Code</th>
                                    <th>Credit Hours</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects[semester].map(subject => (
                                    <tr key={subject.id}>
                                        {editSubjectId === subject.id ? (
                                            <td colSpan="4">
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        editSubject(
                                                            semester,
                                                            subject.id,
                                                            newSubjectName,
                                                            newSubjectCode,
                                                            newSubjectCredits
                                                        );
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        value={newSubjectName}
                                                        onChange={(e) => setNewSubjectName(e.target.value)}
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        value={newSubjectCode}
                                                        onChange={(e) => setNewSubjectCode(e.target.value)}
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        value={newSubjectCredits}
                                                        onChange={(e) => setNewSubjectCredits(e.target.value)}
                                                        required
                                                    />
                                                    <button type="submit" className="btn btn-success me-2">Save</button>
                                                    <button type="button" className="btn btn-secondary" onClick={() => setEditSubjectId(null)}>Cancel</button>
                                                </form>
                                            </td>
                                        ) : (
                                            <>
                                                <td>{subject.name}</td>
                                                <td>{subject.code}</td>
                                                <td>{subject.credits}</td>
                                                <td>
                                                    <button className="btn btn-danger me-2" onClick={() => deleteSubject(semester, subject.id)}>Delete</button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            setEditSubjectId(subject.id);
                                                            setNewSubjectName(subject.name);
                                                            setNewSubjectCode(subject.code);
                                                            setNewSubjectCredits(subject.credits);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasAddSubject" aria-labelledby="offcanvasAddSubjectLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasAddSubjectLabel">Add Subject</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleAddSubjects}>
                        <div className="form-group mb-3">
                            <label htmlFor="selectSemester" className="form-label">Select Semester</label>
                            <select id="selectSemester" className="form-control" value={selectedSemester} onChange={handleSemesterChange} required>
                                <option value="">Select Semester</option>
                                {semesters.map((semester) => (
                                    <option key={semester.id} value={semester.id}>{semester.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="subjectName" className="form-label">Subject Name</label>
                            <input type="text" id="subjectName" name="subjectName" className="form-control" required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="subjectCode" className="form-label">Course Code</label>
                            <input type="text" id="subjectCode" name="subjectCode" className="form-control" required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="subjectCredits" className="form-label">Credit Hours</label>
                            <input type="text" id="subjectCredits" name="subjectCredits" className="form-control" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Subject</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubjectPage;
