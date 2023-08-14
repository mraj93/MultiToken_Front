import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "../CSS/NFTDetails.css";
import {FaCopy, FaCheck, FaExternalLinkAlt, FaEthereum} from "react-icons/fa";
import axios from "axios";
import creatorIcon from "../images/square-48.png";
import currentIcon from "../images/square-48 (1).png";
import Web3 from "web3";
import ReactLoading from "react-loading";

const NFTDetail = () => {
    const { tokenId } = useParams();
    const [isCopiedCreator, setIsCopiedCreator] = useState(false);
    const [isCopiedCurrent, setIsCopiedCurrent] = useState(false);
    const [detail, setDetail] = useState({});
    const [owner, setOwner] = useState('');
    const [creator, setCreator] = useState('');
    const [isLoading, setISLoading] = useState(false);

    const formatAddress = (address) => {
        if (!address) return "";
        const firstFour = address.slice(0, 7);
        const lastFour = address.slice(-8);
        const dots = "...";
        return `${firstFour}${dots}${lastFour}`;
    };

    const handleCopy = (addressType, addressValue) => {
        navigator.clipboard.writeText(addressValue)
            .then(() => {
                if (addressType === "Creator") {
                    setIsCopiedCreator(true);
                    setTimeout(() => {
                        setIsCopiedCreator(null);
                    }, 1000);
                }
                if (addressType === "Current Owner") {
                    setIsCopiedCurrent(true);
                    setTimeout(() => {
                        setIsCopiedCurrent(null);
                    }, 1000);
                }
            })
            .catch((error) => {
                console.error("Failed to copy text: ", error);
            });
    };

    const NFTDetails = async (tokenId) => {
        setISLoading(true);
        axios.get(process.env.REACT_APP_API_HOST + `/NFTDetails/${tokenId}`)
            .then(res => {
                console.log('Data:', res.data);
                setDetail(res.data.data);
                setOwner(res.data.owner);
                setCreator(res.data.creator);
                setISLoading(false);
            })
            .catch(error => {
                console.error('API error:', error);
                setISLoading(false);
            });
    }

    useEffect(() => {
        NFTDetails(tokenId);
    }, []);

    return (
        <>
            { isLoading && (
                <div className="loader-container">
                    <p>Loading...</p>
                    <ReactLoading type="spin" color="cyan" height={80} width={90} />
                </div>
            )}

            <div className={`content-container ${isLoading ? 'blur-background' : ''}`}>
            <div className="container">
                <div className="nft-detail-card">
                    <div className="nft-detail-image">
                        <img src={detail?.nftURI} alt={detail?.nftName}/>
                    </div>
                </div>

                <div className="nft-detail-info-container">
                    <div className="nft-detail-info">
                        <div className="nft-name">
                            <h5>{detail?.nftName}</h5>
                        </div>

                        <div className="combine my-5">
                            <div className="description">
                                <div className="icon-container">
                                    <img
                                        src={creatorIcon}
                                        alt="Creator Icon"
                                        className="creator-icon"
                                    />
                                </div>
                                <div className="address-container">
                                    <h5>Creator</h5>
                                    <div className="address-info">
                                        <p>{formatAddress(owner)}</p>
                                        <div className="copy-icon-container">
                                            <FaCopy
                                                className="copy-icon"
                                                onClick={() => handleCopy("Creator", creator)}
                                            />
                                            {isCopiedCreator && (
                                                <FaCheck className="copied-message"/>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="description mx-5">
                                <div className="icon-container">
                                    <img
                                        src={currentIcon}
                                        alt="Creator Icon"
                                        className="creator-icon"
                                    />
                                </div>
                                <div className="address-container">
                                    <h5>Current Owner</h5>
                                    <div className="address-info">
                                        <p>{formatAddress(owner)}</p>
                                        <div className="copy-icon-container">
                                            <FaCopy
                                                className="copy-icon"
                                                onClick={() => handleCopy("Current Owner", owner)}
                                            />
                                            {isCopiedCurrent && (
                                                <FaCheck className="copied-message"/>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="combine">
                            <div className="description">
                                <div className="address-container mx-2">
                                    <h5>Token ID</h5>
                                    <div className="address-info">
                                        <p>{tokenId}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="description" style={{marginLeft: "190px"}}>
                                <div className="address-container">
                                    <h5>Creator Fee</h5>
                                    <div className="address-info">
                                        <p>1.5 %</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center price">
                            <div>
                                <h5>Price</h5>
                                <p className="price-section">
                                    {detail?.price !== undefined ? `${Web3.utils.fromWei(detail.price, "ether")} ETH` : "Loading..."}
                                </p>
                            </div>
                            <div className="d-flex flex-column buttons">
                                <button
                                    className="btn btn-primary buy-button mb-2 btn-lg custom-button"
                                    style={{fontSize: "18px"}}
                                >
                                    Buy
                                </button>
                                <button
                                    className="btn btn-primary buy-button mt-2 btn-lg custom-button"
                                    style={{fontSize: "18px"}}
                                >
                                    Place a Bid [Coming Soon...]
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className="detail-title">Description</h5>
            <div className="details" style={{border: "none", height: "auto"}}>
                <p>{detail?.description}</p>
            </div>

            <h5 className="detail-title">Details</h5>
            <div className="details">
                <div className="details-style">
                    <div className="icon-section">
                        <FaEthereum
                            size={20}
                            color="currentColor"
                            style={{marginRight: "10px"}}
                        />
                        <p>ERC-721</p>
                    </div>
                    <div className="icon-section">
                        <p>
                            <Link
                                to={`https://sepolia.etherscan.io/tx/${detail?.generateReceipt}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="custom-link"
                            >
                                <FaCheck
                                    size={20}
                                    color="currentColor"
                                    style={{marginRight: "10px"}}
                                />
                                View on Etherscan
                            </Link>
                        </p>
                    </div>
                    <div className="icon-section">
                        <p>
                            <Link
                                to={detail?.nftURI}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="custom-link"
                            >
                                <FaExternalLinkAlt
                                    size={20}
                                    color="currentColor"
                                    style={{marginRight: "10px"}}
                                />Content on IPFS
                            </Link>
                        </p>
                    </div>

                    <div className="icon-section">
                        <p>
                            <Link
                                to={detail?.metaDataURI}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="custom-link"
                            >
                                <FaExternalLinkAlt
                                    size={20}
                                    color="currentColor"
                                    style={{marginRight: "10px"}}
                                />
                                View Metadata
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default NFTDetail;
