import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../CSS/NFTDetails.css";
import { FaCopy, FaCheck, FaExternalLinkAlt, FaEthereum} from "react-icons/fa";
import creatorIcon from "../images/square-48.png";
import currentIcon from "../images/square-48 (1).png";

const NFTDetail = () => {
  const [isCopiedCreator, setIsCopiedCreator] = useState(false);
  const [isCopiedCurrent, setIsCopiedCurrent] = useState(false);

  const nftData = {
    title: "Name1",
    owner: "0x0fa6007b8DD1520F6bF3C0E11B22fDF67f9Eb5d8",
    currentOwner: "0x0fa6007b8DD1520F6bF3C0E11B22fDF67f9Eb5d8s",
    price: "0.05 ETH",
    description: "This is the description of the NFT",
    imageSrc: "https://example.com/nft-image.jpg",
    bigImageSrc:
      "https://lh3.googleusercontent.com/dp6IxoLYPX2PmxkGSD-RayBfFWG7qXXu6w5MTA_fBKat7PwGfZq4V0DvUjXjpqKouLlgCqzxRjzdvIWm-pUHiCCx0rK5QVrHCUQ=s400",
  };

  const formatAddress = (address) => {
    if (!address) return "";
    const firstFour = address.slice(0, 7);
    const lastFour = address.slice(-8);
    const dots = "...";
    return `${firstFour}${dots}${lastFour}`;
  };

  const handleCopy = (addressType, addressValue) => {
    navigator.clipboard
      .writeText(addressValue)
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

  return (
    <>
      <div className="container">
        <div className="nft-detail-card">
          <div className="nft-detail-image">
            <img src={nftData.bigImageSrc} alt={nftData.title} />
          </div>
        </div>

        <div className="nft-detail-info-container">
          <div className="nft-detail-info">
            <div className="nft-name">
              <h5>{nftData.title}</h5>
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
                    <p>{formatAddress(nftData.owner)}</p>
                    <div className="copy-icon-container">
                      <FaCopy
                        className="copy-icon"
                        onClick={() => handleCopy("Creator", nftData.owner)}
                      />
                      {isCopiedCreator && (
                        <FaCheck className="copied-message" />
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
                    <p>{formatAddress(nftData.currentOwner)}</p>
                    <div className="copy-icon-container">
                      <FaCopy
                        className="copy-icon"
                        onClick={() =>
                          handleCopy("Current Owner", nftData.currentOwner)
                        }
                      />
                      {isCopiedCurrent && (
                        <FaCheck className="copied-message" />
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
                  <div className="font-class">
                    <p>1</p>
                  </div>
                </div>
              </div>
              <div className="description" style={{ marginLeft: "190px" }}>
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
                <p className="price-section">{nftData.price}</p>
              </div>
              <div className="d-flex flex-column buttons">
                <button
                  className="btn btn-primary buy-button mb-2 btn-lg custom-button"
                  style={{ fontSize: "18px" }}
                >
                  Buy
                </button>
                <button
                  className="btn btn-primary buy-button mt-2 btn-lg custom-button"
                  style={{ fontSize: "18px" }}
                >
                  Place a Bid [Coming Soon...]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="detail-title">Description</h5>
      <div className="details" style={{ border: "none", height: "auto" }}>
        <p>{nftData.description}</p>
      </div>

      <h5 className="detail-title">Details</h5>
      <div className="details">
        <div className="details-style">
          <div className="icon-section">
            <FaEthereum
              size={20}
              color="currentColor"
              style={{ marginRight: "10px" }}
            />
            <p>ERC-721</p>
          </div>
          <div className="icon-section">
            <p>
              <Link
                to="https://etherscan.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-link"
              >
                <FaCheck
                  size={20}
                  color="currentColor"
                  style={{ marginRight: "10px" }}
                />
                Look on Etherscan
              </Link>
            </p>
          </div>
          <div className="icon-section">
            <p>
              <Link
                to="https://etherscan.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-link"
              >
                <FaExternalLinkAlt
                  size={20}
                  color="currentColor"
                  style={{ marginRight: "10px" }}
                />
                View Metadata
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTDetail;
