import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NFTMarketSidebar from "./NFTMarketSidebar";
import "../CSS/NFTMarket.css";
import InfiniteScroll from "react-infinite-scroll-component";

const GameTokenMarket = () => {
  const nftData = [
    {
      imageSrc:
        "https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/pubg-gun-4163ac13433e4a31d31f2ca33979225f.jpg",
      title: "NFT 1",
      owner: "User 2",
      price: "0.08 ETH",
    },
    {
      imageSrc:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/clans/27971017/ca24e346b8236a408d2ccfa4aa0af03570a410fa.jpg",
      title: "NFT 2",
      owner: "User 1",
      price: "0.05 ETH",
    },
    {
      imageSrc:
        "https://e0.pxfuel.com/wallpapers/140/589/desktop-wallpaper-x-suite-pubg-mobile-in-2021-new-mobile-android-animated-for-mobile-avalanche-x-suit.jpg",
      title: "NFT 3",
      owner: "User 2",
      price: "0.08 ETH",
    },
    {

      imageSrc:
        "https://lh3.googleusercontent.com/r-BvuH7oA38uTq70mUyeYsJSX1hiPINcf1-rLqZjLy_WihwT8agq4RSXXimxgNqbU-YURV5212PJq6gUdoApEU_VJvCdPahpuZfz=s400",
      title: "NFT 4",
      owner: "User 2",
      price: "0.08 ETH",
    },
    {
      imageSrc:
        "https://e1.pxfuel.com/desktop-wallpaper/167/707/desktop-wallpaper-new-twitch-skins-jennajulien-m24-skipnho-slr-m24-pubg.jpg",
      title: "NFT 4",
      owner: "User 2",
      price: "0.08 ETH",
    },
    {

      imageSrc:
        "https://www.pngitem.com/pimgs/m/516-5166075_pubg-mobile-pubg-mobile-car-png-transparent-png.png",
      title: "NFT 4",
      owner: "User 2",
      price: "0.08 ETH",
      checking_commit
    },
    {
      imageSrc:
        "https://lh3.googleusercontent.com/r-BvuH7oA38uTq70mUyeYsJSX1hiPINcf1-rLqZjLy_WihwT8agq4RSXXimxgNqbU-YURV5212PJq6gUdoApEU_VJvCdPahpuZfz=s400",
      title: "NFT 4",
      owner: "User 2",
      price: "0.08 ETH",
    },
  ];

  const itemsPerPage = 9;
  const [displayedData, setDisplayedData] = useState(
    nftData.slice(0, itemsPerPage)
  );

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="sidebar-box mx-3 my-3">
              <NFTMarketSidebar />
            </div>
          </Col>

          <Col md={9}>
            <div className="explore-page mx-3 my-3">
              <InfiniteScroll
                dataLength={displayedData.length}

                hasMore={displayedData.length < nftData.length}
                loader={<h4>Loading...</h4>}
                endMessage={<h4>No more items</h4>}
              >
                <div className="nft-cards">
                  {displayedData.map((nft, index) => (
                    <div key={index} className="nft-card">
                      <img
                        src={nft.imageSrc}
                        alt={nft.title}
                        className="nft-image"
                      />
                      <div className="nft-details">
                        <h3 className="nft-title">{nft.title}</h3>
                        <p className="nft-owner">Owner: {nft.owner}</p>
                        <p className="nft-price">Price: {nft.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GameTokenMarket;