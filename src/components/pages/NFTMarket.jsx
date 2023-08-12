import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NFTMarketSidebar from './NFTMarketSidebar';
import '../CSS/NFTMarket.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import ReactLoading from "react-loading";

const NFTMarket = () => {
    const navigate = useNavigate();
    const [nft, setNft] = useState([]);
    const itemsPerPage = 1001;
    const [displayedData, setDisplayedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const NFTDetail = (ele) => {
        console.log("ele is:", ele);
        // const titleWithHyphen = element.title.replace(/\s+/g, '-');
        navigate(`/nft/details/${ele}`);
    }

    const getAllnfts = async () => {
        setIsLoading(true);
        try {
            const res =await axios.get(process.env.REACT_APP_API_HOST + "/getAllnfts");
            console.log("all nfts is here", res.data)
            setNft(res.data);
            setDisplayedData(res.data.data.slice(0, itemsPerPage));
            setIsLoading(false);
        }
        catch (e) {
            console.error("error while getting data", e);
            setIsLoading(false);
        }
    }

    useEffect( () => {
        getAllnfts();
    }, [])

    const loadMoredata = () => {
        const nextData = nft.slice(displayedData.length, displayedData.length + itemsPerPage);
        setDisplayedData(((prevData) => [...prevData, ...nextData]));
    }

    return (
        <>
            { isLoading && (
                <div className="loader-container">
                    <p>Loading...</p>
                    <ReactLoading type="spin" color="cyan" height={80} width={90} />
                </div>
            )}

            <div className={`content-container ${isLoading ? 'blur-background' : ''}`}>
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
                                next={loadMoredata}
                                hasMore={displayedData.length < nft.length}
                                loader={<h4>Loading...</h4>}
                                endMessage={<h4
                                    className="message mt-4"
                                    style={{color : 'white'}}>No more items</h4>}
                            >
                                <div className="nft-cards">
                                    {displayedData.map((nft, index) => (
                                        <div key={index} className="nft-card" onClick={() => NFTDetail(nft.tokenId)}>
                                            <img src={nft.nftURI} alt={nft.nftName} className="nft-image" />
                                            <div className="nft-details">
                                                <h3 className="nft-title">{nft.nftName}</h3>
                                                <p className="nft-price">{Web3.utils.fromWei(nft.price, "ether")} ETH</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
    );
};

export default NFTMarket;