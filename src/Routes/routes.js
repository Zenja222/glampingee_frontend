import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';
import MainPage from '../components/mainPage/MainPage';
import ExplorePage from '../views/ExplorePage'

const AppRoutes = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                {/* Add more  */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;