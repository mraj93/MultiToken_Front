import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NFTMarketSidebar from './NFTMarketSidebar';
import '../CSS/NFTMarket.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useNavigate} from "react-router-dom";

const NFTMarket = () => {

    const nftData = [
        {
            imageSrc : 'https://lh3.googleusercontent.com/dp6IxoLYPX2PmxkGSD-RayBfFWG7qXXu6w5MTA_fBKat7PwGfZq4V0DvUjXjpqKouLlgCqzxRjzdvIWm-pUHiCCx0rK5QVrHCUQ=s400',
            title: 'NFT 1',
            owner: 'User 2',
            price: '0.08 ETH',
        },
        {
            // imageSrc: 'https://assets.raribleuserdata.com/prod/v1/image/t_image_preview/aHR0cHM6Ly9zMy51cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9hc3NldHMuYXRzbmZ0LmlvL3JvdGEvaW1hZ2VzLzg0NTcucG5n',
            imageSrc: 'https://lh3.googleusercontent.com/Y7LSMwSU8zdtyMPO4mEPiEZc4ktinvvIESDyfgQAEVXv2vdNOZ2VjTyNu6SjSamDNRNfRopf9yrtNvPEf7T5Cnm8I8ISqVpDBAeZ=s400  ',
            title: 'NFT 2',
            owner: 'User 1',
            price: '0.05 ETH',
        },
        {
            // imageSrc: "https://lh3.googleusercontent.com/xfJZPsyXsUtQZIzUZO5-hGnwGOrdS-ne4jEnbMhN5OzP1idb58Fa5ELTLk5udqoNJSIaY02XH_fugPsqL-169szYxdLAkAIKh3E=s400",
            imageSrc : 'https://lh3.googleusercontent.com/gphCKjsKV-h9bnU7p76sawMuECbc2fyGYIkhyGUJqJDFDgbeMOOFA-Pj47weFe9iBQplmk4SK6bxfVC5YBnnVa2wikjzxq9YSTc=s400',
            title: 'NFT 3',
            owner: 'User 2',
            price: '0.08 ETH',
        },
        {
            // imageSrc: "https://lh3.googleusercontent.com/dtV6C20zy7MxOgfsbKmTvx6Fnlz5OG6SAujgYAZjfJTgQQEt4frHLnl1Yyv8pJiP05EBDGCmb3A19ny2JVniW7ewz9-YCNlkEko=s400",
            imageSrc: 'https://lh3.googleusercontent.com/r-BvuH7oA38uTq70mUyeYsJSX1hiPINcf1-rLqZjLy_WihwT8agq4RSXXimxgNqbU-YURV5212PJq6gUdoApEU_VJvCdPahpuZfz=s400',
            title: 'NFT 4',
            owner: 'User 2',
            price: '0.08 ETH',
        },{
            // imageSrc: "https://lh3.googleusercontent.com/dtV6C20zy7MxOgfsbKmTvx6Fnlz5OG6SAujgYAZjfJTgQQEt4frHLnl1Yyv8pJiP05EBDGCmb3A19ny2JVniW7ewz9-YCNlkEko=s400",
            imageSrc: 'https://lh3.googleusercontent.com/r-BvuH7oA38uTq70mUyeYsJSX1hiPINcf1-rLqZjLy_WihwT8agq4RSXXimxgNqbU-YURV5212PJq6gUdoApEU_VJvCdPahpuZfz=s400',
            title: 'NFT 4',
            owner: 'User 2',
            price: '0.08 ETH',
        },{
            // imageSrc: "https://lh3.googleusercontent.com/dtV6C20zy7MxOgfsbKmTvx6Fnlz5OG6SAujgYAZjfJTgQQEt4frHLnl1Yyv8pJiP05EBDGCmb3A19ny2JVniW7ewz9-YCNlkEko=s400",
            imageSrc: 'https://lh3.googleusercontent.com/r-BvuH7oA38uTq70mUyeYsJSX1hiPINcf1-rLqZjLy_WihwT8agq4RSXXimxgNqbU-YURV5212PJq6gUdoApEU_VJvCdPahpuZfz=s400',
            title: 'NFT 4',
            owner: 'User 2',
            price: '0.08 ETH',
        },{
            // imageSrc: "https://lh3.googleusercontent.com/dtV6C20zy7MxOgfsbKmTvx6Fnlz5OG6SAujgYAZjfJTgQQEt4frHLnl1Yyv8pJiP05EBDGCmb3A19ny2JVniW7ewz9-YCNlkEko=s400",
            imageSrc: 'https://lh3.googleusercontent.com/r-BvuH7oA38uTq70mUyeYsJSX1hiPINcf1-rLqZjLy_WihwT8agq4RSXXimxgNqbU-YURV5212PJq6gUdoApEU_VJvCdPahpuZfz=s400',
            title: 'NFT 4',
            owner: 'User 2',
            price: '0.08 ETH',
        },
    ];
    const navigate = useNavigate()
    const itemsPerPage = 9; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedData, setDisplayedData] = useState(nftData.slice(0, itemsPerPage));

    const NFTDetail = (element) => {
        const titleWithHyphen = element.title.replace(/\s+/g, '-');
        navigate(`details/${titleWithHyphen}`);

        console.log("clicked on details page here")
        console.log("elemnet is here:", element)
    }

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
                                // next={loadMoreData}
                                hasMore={displayedData.length < nftData.length}
                                loader={<h4>Loading...</h4>}
                                endMessage={<h4
                                    className="message mt-4"
                                    style={{color : 'black'}}>No more items</h4>}
                            >
                                <div className="nft-cards">
                                    {displayedData.map((nft, index) => (
                                        <div key={index} className="nft-card" onClick={() => NFTDetail(nft)}>
                                            <img src={nft.imageSrc} alt={nft.title} className="nft-image" />
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
                    </Col>F

                </Row>
            </Container>
    </>
    );
};

export default NFTMarket;
