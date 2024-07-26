import React, { useState } from 'react';
import SubjectPage from './SubjectPage';
import CombinedPage from './CombinedPage';

const ParentComponent = () => {
    const [semesters, setSemesters] = useState([]);

    const handleAddSemester = (newSemester) => {
        if (newSemester && !semesters.includes(newSemester)) {
            setSemesters([...semesters, newSemester]);
        }
    };

    return (
        <div>
            <SubjectPage semesters={semesters} onAddSemester={handleAddSemester} />
            <CombinedPage semesters={semesters} />
        </div>
    );
};

export default ParentComponent;
