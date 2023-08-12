import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/layouts/Header";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import HomePage from "./components/pages/HomePage";
import ERC721Create from "./components/pages/ERC721Create";
import ERC1155Create from "./components/pages/ERC721Create";
import NFTMarket from "./components/pages/NFTMarket";
import GameTokenMarket from "./components/pages/GameTokenMarket";
import NFTDetails from "./components/pages/NFTDetails";

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>

                <Route path="/" element={<HomePage />} />

                <Route path="/create/NFT" element={<ERC721Create />} />
                <Route path="/create/ERC1155" element={<ERC1155Create />} />

                {/*<Route path="/nftmarket" element={<NFTMarket />} />*/}
                {/*<Route path="/gametokemarket" element={<GameTokenMarket />} />*/}
                {/*<Route path="/nft/details/:tokenId" element={<NFTDetails />} />*/}
            </Routes>
        </Router>
    );
};

export default App;