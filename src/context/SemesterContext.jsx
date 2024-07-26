
import React, { createContext, useState, useEffect } from 'react';

export const SemesterContext = createContext();

export const SemesterProvider = ({ children }) => {
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
       
        setSemesters([
            { id: '1', name: 'Semester 1' },
            { id: '2', name: 'Semester 2' },
            { id: '3', name: 'Semester 3' },
            { id: '4', name: 'Semester 4' },
            { id: '5', name: 'Semester 5' },
            { id: '6', name: 'Semester 6' },
            { id: '7', name: 'Semester 7' },
            { id: '8', name: 'Semester 8' },
        ]);
    }, []);

    return (
        <SemesterContext.Provider value={{ semesters }}>
            {children}
        </SemesterContext.Provider>
    );
};
