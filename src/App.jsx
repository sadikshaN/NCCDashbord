import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SubjectPage from './components/SubjectPage';
import NoticePage from './components/NoticePage';
import FacultyPage from './components/FacultyPage';
import CombinedPage from './components/CombinedPage';
import TeachersPage from './components/TeachersPage';
import SemesterPage from './components/SemesterPage';
import NotesPage from './components/NotesPage';
import { SubjectsProvider } from './context/SubjectsContext';
import { SemesterProvider } from './context/SemesterContext';
import AdminLoginPage from './components/AdminLoginPage';

import './App.css';

const App = () => {
    return (
        <SubjectsProvider>
            <SemesterProvider>
                <Router>
                    <Header />
                    <div className="content-container">
                        <Routes>
                            <Route path="/subject" element={<SubjectPage />} />
                            <Route path="/notice" element={<NoticePage />} />
                            <Route path="/faculty" element={<FacultyPage />} />
                            <Route path="/teachers" element={<TeachersPage />} />
                            <Route path="/semester" element={<SemesterPage />} />
                            <Route path="/answer" element={<CombinedPage />} />
                            <Route path="/notes" element={<NotesPage />} />
                            <Route path="/login" element={<AdminLoginPage />} /> 
                        </Routes>
                    </div>
                </Router>
            </SemesterProvider>
        </SubjectsProvider>
    );
};

export default App;
