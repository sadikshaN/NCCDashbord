// src/context/SubjectsContext.js
import React, { createContext, useState } from 'react';

export const SubjectsContext = createContext();

export const SubjectsProvider = ({ children }) => {
    const [subjects, setSubjects] = useState({});

    const addSubject = (semesterId, name, code, credits) => {
        setSubjects(prevSubjects => ({
            ...prevSubjects,
            [semesterId]: [
                ...(prevSubjects[semesterId] || []),
                { id: Date.now(), name, code, credits }
            ]
        }));
    };

    return (
        <SubjectsContext.Provider value={{ subjects, setSubjects, addSubject }}>
            {children}
        </SubjectsContext.Provider>
    );
};
