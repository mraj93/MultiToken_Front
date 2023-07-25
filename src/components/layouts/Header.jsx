import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../CSS/header.css';
import {FaCopy, FaEthereum } from "react-icons/fa";
import { ethers } from "ethers";

const Header = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        setShowOptions(false);
    };

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setConnected(true);
                setAccount(accounts[0]);
                localStorage.setItem('userAccount', accounts[0]);
            } else {
                alert('Please install MetaMask to connect your wallet.');
            }
        } catch (error) {
            console.error('Wallet connection error', error);
        }
    };

    const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
            setConnected(false);
            setAccount(null);
            setBalance(null);
        } else {
            setConnected(true);
            setAccount(accounts[0]);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(accounts[0]);
            setBalance(ethers.utils.formatEther(balance));
        }
        setIsConnecting(false);
    };

    const disconnectWallet = async () => {
        try {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                setConnected(false);
                setAccount(null);
                localStorage.removeItem('userAccount');
                alert('Logout Success');
            }
        } catch (error) {
            alert('Logout failed');
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                if (accounts.length === 0) {
                    setConnected(false);
                    setAccount(null);
                    localStorage.removeItem('userAccount');
                } else {
                    setConnected(true);
                    setAccount(accounts[0]);
                    localStorage.setItem('userAccount', accounts[0]);
                }
            };
            window.ethereum.on('accountsChanged', handleAccountsChanged);

            const fetchBalance = async () => {
                if (account) {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const balance = await provider.getBalance(account);
                    setBalance(ethers.utils.formatEther(balance));
                }
            };
            fetchBalance();

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            };
        }
    }, [account])

    useEffect(() => {
        const storedAccount = localStorage.getItem('userAccount');
        if (storedAccount) {
            setConnected(true);
            setAccount(storedAccount);
        }
    }, []);

    const copyOwnerToClipboard = () => {
        if (account) {
            navigator.clipboard.writeText(account);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
        }
    };

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
                            <div className="user-details">
                                <div className="account-address">
                                    <FaEthereum size={20} color="currentColor" style={{ marginRight: '5px' }} />
                                    <p className="account-info">{account}</p>
                                    <FaCopy
                                        className="copy-icon my-2 mb-3"
                                        onClick={copyOwnerToClipboard}
                                    />
                                    {isCopied && <span>Copied</span> }
                                </div>
                                <p className=" mx-4 mt-1 account-info"> {balance} ETH</p>
                            </div>
                            <button className="btn-primary btn logout-button" onClick={disconnectWallet}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="connect-wallet-container">
                            <button className="connect-wallet-button" onClick={connectWallet} disabled={connected}>Connect Wallet</button>
                        </div>
                    )}
                </div>

            </header>
        </>
    );
};

export default Header;