import React, { useContext, useState } from 'react';
import { SubjectsContext } from '../context/SubjectsContext';
import { SemesterContext } from '../context/SemesterContext';

const NotesPage = () => {
    const { subjects } = useContext(SubjectsContext);
    const { semesters } = useContext(SemesterContext);
    const [notes, setNotes] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        if (selectedFile && selectedSemester && title) {
            const newNote = {
                id: Date.now(),
                title,
                file: URL.createObjectURL(selectedFile),
                fileName: selectedFile.name,
            };

            const updatedNotes = { ...notes };
            if (!updatedNotes[selectedSemester]) {
                updatedNotes[selectedSemester] = [];
            }
            updatedNotes[selectedSemester].push(newNote);
            setNotes(updatedNotes);
            setSelectedFile(null);
            setTitle('');
        }
    };

    const handleDeleteNote = (semester, id) => {
        const updatedNotes = { ...notes };
        updatedNotes[semester] = updatedNotes[semester].filter(note => note.id !== id);
        setNotes(updatedNotes);
    };

    return (
        <div className="notes-page content">
            <h1>Manage Notes by Semester</h1>
            <div className="mb-3">
                <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddNote" aria-controls="offcanvasAddNote">
                    Add Note
                </button>
            </div>
            <div className="data-gallery">
                {Object.keys(notes).map(semester => (
                    <div key={semester} className="semester-data">
                        <h2>Semester {semester}</h2>
                        {notes[semester].map(note => (
                            <div key={note.id} className="data-item">
                                <a href={note.file} target="_blank" rel="noopener noreferrer">{note.title}</a>
                                <button onClick={() => handleDeleteNote(semester, note.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasAddNote" aria-labelledby="offcanvasAddNoteLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasAddNoteLabel">Add Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleAddNote}>
                        <div className="form-group mb-3">
                            <label htmlFor="semesterSelect" className="form-label">Select Semester:</label>
                            <select id="semesterSelect" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="form-control" required>
                                <option value="" disabled>Select Semester</option>
                                {semesters.map((semester) => (
                                    <option key={semester.id} value={semester.id}>{semester.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="noteTitle" className="form-label">Title:</label>
                            <input
                                type="text"
                                id="noteTitle"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="noteFile" className="form-label">File:</label>
                            <input type="file" id="noteFile" className="form-control" onChange={handleFileChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Note</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NotesPage;
