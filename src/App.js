import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/layouts/Header";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import HomePage from "./components/pages/HomePage";
import ERC721Create from "./components/pages/ERC721Create";
import './global.css';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create/NFT" element={<ERC721Create />} />
            </Routes>
        </Router>
    );
};

export default App;