import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../CSS/NFTDetails.css';
import { FaCopy, FaCheck, FaExternalLinkAlt, FaEthereum } from 'react-icons/fa';
// import { RiArrowRightUpFill } from "react-icons/fa6";

const NFTDetail = () => {
    // const { title } = useParams();
    // const formattedTitle = title.replace(/-/g, ' ');
    const [isCopied, setIsCopied] = useState(false);

    const nftData = {
        title: "Name1",
        owner: '0x0fa6007b8DD1520F6bF3C0E11B22fDF67f9Eb5d8',
        price: '0.05 ETH',
        description: 'This is the description of the NFT',
        imageSrc: 'https://example.com/nft-image.jpg',
        bigImageSrc: 'https://lh3.googleusercontent.com/dp6IxoLYPX2PmxkGSD-RayBfFWG7qXXu6w5MTA_fBKat7PwGfZq4V0DvUjXjpqKouLlgCqzxRjzdvIWm-pUHiCCx0rK5QVrHCUQ=s400',
    }

    const copyOwnerToClipboard = () => {
        navigator.clipboard.writeText(nftData.owner);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500); // Display "Copied" for 1.5 seconds
    };

    const bidData = [
        { from: '0x0fa6007b8DD1520F6bF3C0E11B22fDF67f9Eb5d8', price: '0.1 ETH' },
        { from: '0x0fa6007b8DD1520F6bF3C0E11B22fDF67f9Eb5d8', price: '0.08 ETH' },
    ];

    return (
        <>
        <div className="nft-detail-page">
            <div className="nft-detail-card">

                <div className="nft-detail-image mx-3 my-4">
                    <img
                         src={nftData.bigImageSrc}
                         alt={nftData.title}
                         style={{ width: '100%', height: '630px'}}
                    />
                </div>

                <div className="nft-detail-info mx-3 my-4">
                    <div className="d-flex justify-content-between">
                        <div className="description">
                            <h5>Token ID</h5>
                            <p>1</p>
                        </div>
                        <div className="description">
                            <h5>Owner</h5>
                            <div className="description-text">
                                <p>{nftData.owner}
                                <FaCopy
                                    className="copy-icon my-2 mb-3"
                                    onClick={copyOwnerToClipboard}
                                />
                                {isCopied && <span className="copied-message">Copied</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <h5>Description</h5>
                        <p>
                            {nftData.description}
                        </p>
                    </div>
                    <div className="price-description d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mx-3 my-1">Price</h5>
                            <p className="price-section mx-3">
                                {nftData.price}
                            </p>
                        </div>
                        <div className="d-flex flex-column buttons">
                            <button className="btn btn-primary buy-button mb-2 btn-lg custom-button" style={{ fontSize: '18px' }}>Buy</button>
                            <button className="btn btn-primary buy-button mt-2 btn-lg custom-button" style={{ fontSize: '18px' }}>Place a Bid [Coming Soon...]</button>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className=" title mx-5 mb-3">Details</h5>
            <div className="details-style mx-5">
                <div className="icon-section">
                    <FaEthereum size={20} color="currentColor" style={{ marginRight: '10px' }} />
                    <p>Ethereum (ERC-721)</p>
                </div>
                <div className="icon-section">
                    <p>
                        <Link to="https://etherscan.io/" target="_blank" rel="noopener noreferrer" className="custom-link">
                            <FaCheck size={20} color="currentColor" style={{ marginRight: '10px' }} />
                            Look on Etherscan
                        </Link>
                    </p>
                </div>

                <div className="icon-section">
                    <p>
                        <Link to="https://etherscan.io/" target="_blank" rel="noopener noreferrer" className="custom-link">
                            <FaExternalLinkAlt size={20} color="currentColor" style={{ marginRight: '10px' }} />
                            View Metadata
                        </Link>
                    </p>
                </div>
            </div>

            <h5 className="title mx-5 mb-3 my-4">Bids [Coming Soon...]</h5>
            <div className="bid-style mx-5">
                <div className="bid-row">
                    <p className="bid-label">From</p>
                    <p className="bid-label" style={{marginRight :'70px'}}>Price</p>
                </div>
                {bidData.map((bid, index) => (
                    <div key={index} className="bid-row">
                        <div className="bid-info">
                            <p>{bid.from}</p>
                        </div>
                        <div className="bid-info mx-5">
                            <p>{bid.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default NFTDetail;
