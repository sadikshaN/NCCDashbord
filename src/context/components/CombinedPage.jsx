import React, { useContext, useState } from 'react';
import { SubjectsContext } from '../context/SubjectsContext';
import { SemesterContext } from '../context/SemesterContext';

const CombinedPage = () => {
    const { subjects } = useContext(SubjectsContext);
    const { semesters } = useContext(SemesterContext);
    const [data, setData] = useState({
        questions: {},
        answers: {},
    });
    const [selectedType, setSelectedType] = useState('questions');
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleAddData = (e) => {
        e.preventDefault();
        if (selectedFile && selectedSemester && title) {
            const newData = {
                id: Date.now(),
                title,
                file: URL.createObjectURL(selectedFile),
                fileName: selectedFile.name,
            };

            const updatedData = { ...data };
            if (!updatedData[selectedType][selectedSemester]) {
                updatedData[selectedType][selectedSemester] = [];
            }
            updatedData[selectedType][selectedSemester].push(newData);
            setData(updatedData);
            setSelectedFile(null);
            setTitle('');
            document.getElementById('offcanvasData').classList.remove('show');
            document.querySelector('body').classList.remove('offcanvas-open');
        }
    };

    const handleDeleteData = (type, semester, id) => {
        const updatedData = { ...data };
        updatedData[type][semester] = updatedData[type][semester].filter(item => item.id !== id);
        setData(updatedData);
    };

    return (
        <div className="combined-page content">
            <h1>Manage Questions and Answers by Semester</h1>
            <div className="mb-3">
                <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasData" aria-controls="offcanvasData">
                    Add Question/Answer
                </button>
            </div>

            {/* Tables for Questions and Answers */}
            {['questions', 'answers'].map(type => (
                <div key={type} className={`data-table ${selectedType === type ? 'show' : 'hide'}`}>
                    <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>File</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data[type]).map(semester => (
                                <React.Fragment key={semester}>
                                    <tr>
                                        <td colSpan="3"><strong>{semester}</strong></td>
                                    </tr>
                                    {data[type][semester].map(item => (
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td><a href={item.file} target="_blank" rel="noopener noreferrer">{item.fileName}</a></td>
                                            <td><button className="btn btn-danger" onClick={() => handleDeleteData(type, semester, item.id)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasData" aria-labelledby="offcanvasDataLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasDataLabel">Add Question/Answer</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleAddData}>
                        <div className="form-group mb-3">
                            <label htmlFor="semester">Select Semester:</label>
                            <select
                                id="semester"
                                value={selectedSemester}
                                onChange={(e) => setSelectedSemester(e.target.value)}
                                required
                                className="form-select"
                            >
                                <option value="" disabled>Select Semester</option>
                                {semesters.map(semester => (
                                    <option key={semester.id} value={semester.id}>{semester.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="dataType">Select Type:</label>
                            <select
                                id="dataType"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                required
                                className="form-select"
                            >
                                <option value="questions">Question</option>
                                <option value="answers">Answer</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title"
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="file">File:</label>
                            <input
                                type="file"
                                id="file"
                                onChange={handleFileChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CombinedPage;
