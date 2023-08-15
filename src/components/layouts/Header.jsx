import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../CSS/header.css';
import {FaCopy, FaEthereum, FaUserCircle, FaPlus, FaSignOutAlt } from "react-icons/fa";
import {ethers} from "ethers";
import NexusLogo from '../images/Logo.png';
import Metamasklogo from '../images/MetaMask_Fox.png.png';
import { useDispatch } from "react-redux";
import {addAddress, addBalance} from "../../redux/action/index";

const Header = () => {
    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [balance, setUserBalance] = useState('');
    const [address, setUserAddress] = useState('');
    const [isCopied, setIsCopied] = useState(false)
    const [showMenus, setShowMenus] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        setShowOptions(false);
    };

    const formatAddress = (address) => {
        if (!address) return '';
        const firstFour = address.slice(0, 5);
        const lastFour = address.slice(-4);
        const dots = '...';
        return `${firstFour}${dots}${lastFour}`;
    };

    const handleConnectWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                setIsConnected(true);
                setUserAddress(accounts[0]);
                localStorage.setItem('address', accounts[0]);
                localStorage.setItem('isConnected', true);
                const provider = await new ethers.providers.Web3Provider(window.ethereum);
                const balance = await provider.getBalance(accounts[0]);
                const formattedBalance =ethers.utils.formatEther(balance);
                setUserBalance(formattedBalance);
            } else {
                alert('Please install MetaMask to connect your wallet.');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    }

    const handlefetchBalance = async () => {
        try {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(address);
            const formattedBalance =ethers.utils.formatEther(balance);
            setUserBalance(formattedBalance);
            dispatch(addBalance(formattedBalance));
        }
        catch (e) {
            // console.error(e)
        }
    }

    useEffect( () => {
        const localStorageConnected = localStorage.getItem('isConnected') === 'true';
         if (localStorageConnected) {
            const localStorageAddress = localStorage.getItem('address');
            setIsConnected(true);
            setUserAddress(localStorageAddress);
            dispatch(addAddress(localStorageAddress));
        }
    }, []);

    useEffect( () => {
        handlefetchBalance();
    }, [address] )

    // const sendAddress = () => {
    //     console.log("1");
    //     dispatch(addAddress(address));
    //     console.log("=2");
    // }
    //
    // sendAddress();

    const handleLogout = () => {
        setIsConnected(false);
        setUserAddress('');
        // setUserBalance('');
        localStorage.removeItem('address');
        localStorage.removeItem('isConnected');
    };

    const copyOwnerToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(address)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 1500);
                })
                .catch((error) => {
                    console.error('Error copying to clipboard:', error);
                    fallbackCopyToClipboard();
                });
        } else {
            fallbackCopyToClipboard();
        }
    };

    const fallbackCopyToClipboard = () => {
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };

    const handleCreateClick = () => {
        setShowMenus(!showMenus);
    };

    const handleCreateMouseLeave = () => {
        setShowMenus(false);
    };

    return (
        <>
            <header className="header">
                    <div className="main-wrap">
                    <nav className="nav">
                        <ul className="nav-links">

                            <Link to="/">
                                <img src={NexusLogo} alt="Your Logo"
                                     style={{ width: '100px', height: 'auto' }}/>
                            </Link>


                            <li className="mx-3">
                                <Link to="/">
                                    <label>Home</label>
                                </Link>
                            </li>
                            <li
                                className="dropdown"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <label>Explore</label>
                                {showOptions && (
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/nftmarket" style={{ fontSize: '18px' }}>NFTs</Link>
                                        </li>
                                        <li>
                                            <Link to="/gametokemarket" style={{ fontSize: '18px' }}>Game Token</Link>
                                        </li>
                                        <li>
                                            <Link to="/create/fnft" style={{ fontSize: '18px' }}>Real Estate</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li
                                className="dropdown mx-3"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <label>Create</label>
                                {showOptions && (
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/create/NFT" style={{ fontSize: '18px' }}>NFT</Link>
                                        </li>
                                        <li>
                                            <Link to="/create/ERC1155" style={{ fontSize: '18px' }}>NFT (ERC1155)</Link>
                                        </li>
                                        <li>
                                            <Link to="/create/FNFT" style={{ fontSize: '18px' }}>F-NFT</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="connect-wallet">
                    <div
                        className="profile-info"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        {isConnected ? (
                            <>
                                <FaUserCircle size={32}/>
                                    {showTooltip && (

                                    <div className="tooltip-content">
                                        <div className="tooltip-container">
                                            <div className="address-section">
                                            <img src={Metamasklogo} alt="Metamask Icon" />
                                            <div className="eth-style">
                                                <span className="eth">Ethereum</span>
                                                <span className="eth-address">{formatAddress(address)}
                                                    <FaCopy size={16}
                                                        className="copy-icon mx-3"
                                                        onClick={copyOwnerToClipboard}
                                                    />
                                                    {isCopied && <span>Copied</span>}
                                                </span>
                                            </div>
                                            </div>
                                        </div>

                                        <div className="info-section">
                                            <div className="module" style={{cursor : "default"}}>
                                                <FaEthereum size={24} />
                                                <p>{parseFloat(balance).toFixed(4)} ETH</p>
                                            </div>

                                            <div className="module"
                                                 onClick={handleCreateClick}
                                                 onMouseLeave={handleCreateMouseLeave}
                                            >
                                                <FaPlus size={24} />
                                                <p>Create</p>
                                                {showMenus && (
                                                    <ul className="create-menu">
                                                        <li>
                                                            <Link to="/create/NFT">NFT</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/create/ERC1155">Game Token</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/create/fnft">House</Link>
                                                        </li>
                                                    </ul>
                                                )}
                                            </div>

                                            <div className="module" onClick={handleLogout}>
                                                <FaSignOutAlt size={24} />
                                                <p>Logout</p>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </>
                        ) : (
                            <button className="btn btn-primary button-wallet" onClick={handleConnectWallet}>
                                Connect Wallet
                            </button>
                    )}
                    </div>
                </div>
            </header>
        </>
    );
};
export default Header;