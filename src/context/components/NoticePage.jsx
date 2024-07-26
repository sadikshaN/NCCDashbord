import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const NoticePage = () => {
    const [notices, setNotices] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotice = {
            id: Date.now(),
            title,
            description,
            date,
        };
        setNotices([...notices, newNotice]);
        setTitle('');
        setDescription('');
        setDate('');
    };

    const handleDelete = (id) => {
        setNotices(notices.filter(notice => notice.id !== id));
    };

    return (
        <div className="notice-page content">
            <h1>College Notices</h1>
            <div className="mb-3">
                <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddNotice" aria-controls="offcanvasAddNotice">
                    Publish Notice
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((notice) => (
                            <tr key={notice.id}>
                                <td>{notice.title}</td>
                                <td>{notice.description}</td>
                                <td>{notice.date}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(notice.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasAddNotice" aria-labelledby="offcanvasAddNoticeLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasAddNoticeLabel">Publish Notice</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="title" className="form-label">Title:</label>
                            <input
                                type="text"
                                id="title"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea
                                id="description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="date" className="form-label">Date:</label>
                            <input
                                type="date"
                                id="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Publish</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NoticePage;
