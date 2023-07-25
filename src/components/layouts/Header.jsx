import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../CSS/header.css';

const Header = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        setShowOptions(false);
    };

    const connectWallet = async () => {
        if (isConnecting) return;

        try {
            setIsConnecting(true);

            if (window.ethereum) {
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                handleAccountsChanged(accounts);
            } else {
                alert('Please install MetaMask to connect your wallet.');
                setIsConnecting(false);
            }
        } catch (error) {
            console.error('Wallet connection error', error);
            setIsConnecting(false);
        }
    };

    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            setConnected(false);
            setAccount(null);
        } else {
            setConnected(true);
            setAccount(accounts[0]);
        }

        setIsConnecting(false); // Reset isConnecting after the connection process is completed
    };

    const disconnectWallet = async () => {
        try {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                setConnected(false);
                setAccount(null);
                alert('Logout Success');
            }
        } catch (error) {
            window.alert('Logout failed');
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            };
        }
    }, []);

    return (
        <>
            <header className="header">
                <div className="logo">
                    <Link to="/">Logo</Link>
                </div>
                <nav className="nav">
                    <ul className="nav-links">

                        <li className="mx-3">
                            <Link to="/">
                                <label className="mx-5">Homepage</label>
                            </Link>
                        </li>
                        <li
                            className="dropdown mx-3"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <label className="mx-4">Explore</label>
                            {showOptions && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/nftmarket" style={{fontSize: '18px'}}>NFTs</Link>
                                    </li>
                                    <li>
                                        <Link to="/gametokemarket" style={{fontSize: '18px'}}>Game Token</Link>
                                    </li>
                                    <li>
                                        <Link to="/create/fnft" style={{fontSize: '18px'}}>Real Estate</Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li
                            className="dropdown mx-3"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <label className="mx-4">Create</label>
                            {showOptions && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/create/NFT" style={{fontSize: '18px'}}>NFT</Link>
                                    </li>
                                    <li>
                                        <Link to="/create/ERC1155" style={{fontSize: '18px'}}>NFT (ERC1155)</Link>
                                    </li>
                                    <li>
                                        <Link to="/create/FNFT" style={{fontSize: '18px'}}>F-NFT</Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                    </ul>
                </nav>
                <div className="user-container">
                    {connected ? (
                        <div className="user-info">
                            <p className="my-3 mx-5 account-info">{account}</p>
                            <button className="logout-button" onClick={disconnectWallet}>Logout</button>
                        </div>
                    ) : (
                        <div className="connect-wallet-container">
                            <button className="connect-wallet-button" onClick={connectWallet}>
                                Connect Wallet
                            </button>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;