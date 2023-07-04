import React, {useState} from 'react';
import {Link, Link as RouterLink} from 'react-router-dom';
import { Avatar, Menu, Badge, Tooltip } from 'antd';
import '../CSS/header.css'
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
    const [showOptions, setShowOptions] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        setShowOptions(false);
    };

    return (
            <header className="header">
                <div className="logo">
                    <Link to="/">Logo</Link>
                </div>
                <nav className="nav">
                    <ul className="nav-links">
                        <li className="mx-3">
                            <Link to="/">Explore</Link>
                        </li>
                        <li
                            className="dropdown mx-3"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to="/create">Create</Link>
                            {showOptions && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/create/NFT">NFT</Link>
                                    </li>
                                    <li>
                                        <Link to="/create/ERC1155">NFT (ERC1155)</Link>
                                    </li>
                                    <li>
                                        <Link to="/create/FNFT">F-NFT</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className="mx-3">
                            <Link to="/my-items">My Items</Link>
                        </li>
                    </ul>
                </nav>

                <div className="user-profile">

                    {/*<div className="user-info">*/}
                    {/*    <span className="username">John Doe</span>*/}
                    {/*    <span className="wallet-address">Wallet Address</span>*/}
                    {/*</div>*/}

                    <div className="connect-wallet">
                        <button className="connect-wallet-button">Connect Wallet</button>
                    </div>
                </div>
            </header>
        );
};

export default Header;