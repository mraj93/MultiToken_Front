import React, {useEffect, useRef, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CSS/homepage.css';
import axios from "axios";
import Web3 from "web3";
import ReactLoading from "react-loading";
import {useNavigate} from "react-router-dom";
import {log} from "@craco/craco/dist/lib/logger";

const HomePage = () => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [nft, setNft] = useState([]);
    const handleNextClick1 = () => {

        if (sliderRef.current) {
            if (currentIndex < nft.length - 4) { // Only move if there are at least 3 more cards to show
                setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, nft.length - 3));
                sliderRef.current.slickNext();
            }
        }
    };

    const handlePrevClick1 = () => {
        if (sliderRef.current) {
            setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
            sliderRef.current.slickPrev();
        }
    };

    const getLatestNFTs = async () => {
        setIsLoading(true);
        console.log("here")
        try {
            console.log("in try");
            console.log("env", process.env.REACT_APP_API_HOST);
            console.log("project_ID", process.env.REACT_APP_PROJECT_ID);
            console.log("API_HOST env fetch", process.env.REACT_APP_API_HOST);
            // console.log("in try 2 env is here", process.env.API_HOST);

            const res = await axios.get(process.env.REACT_APP_API_HOST + '/recentNFTs');

            // const res = await axios.get("https://api-nexus.onrender.com/recentNFTs");
            // console.log("in try 2", process.env.VERCEL_API_HOST);
            console.log("in try 2 /recentNFTs");
            console.log('all nfts is here', res.data);
            setNft(res.data.data);
        } catch (e) {
            console.error('error while getting data', e);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getLatestNFTs();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    const NFTDetail = (ele) => {
        console.log('ele is:', ele);
        navigate(`/nft/details/${ele}`);
    };

    return (
        <div className="homepage-container">
            {isLoading && (
                <div className="loader-container">
                    <p>Loading...</p>
                    <ReactLoading type="spin" color="cyan" height={80} width={90} />
                </div>
            )}

            <div className={`content-container ${isLoading ? 'blur-background' : ''}`}>
                <div className="your-slider-container">
                    <Slider {...settings} ref={sliderRef}>
                        <div className="slider-item">
                            <img
                                src="https://i0.wp.com/cbaatthebar.chicagobar.org/wp-content/uploads/2021/04/NFT.jpg?w=788&ssl=1"
                                alt="Slide 1"
                                className="slider-image"
                                style={{width: '100%', height: '600px'}}
                            />
                        </div>
                        <div className="slider-item">
                            <img
                                src="https://mudrex.com/blog/wp-content/uploads/2023/06/WhatsApp-Image-2023-05-05-at-2.59.53-PM-2.jpeg"
                                alt="Slide 2"
                                className="slider-image"
                                style={{width: '100%', height: '600px'}}
                            />
                        </div>
                        <div className="slider-item">
                            <img
                                src="https://s3.amazonaws.com/assets.coingecko.com/app/public/ckeditor_assets/pictures/1757/content_nft.png"
                                alt="Slide 3"
                                className="slider-image"
                                style={{width: '100%', height: '600px'}}
                            />
                        </div>
                    </Slider>

                    <div className="custom-next-icon" onClick={handleNextClick1}>
                        &gt;
                    </div>
                </div>

                <div className="section-spacing">
                    <h2 style={{marginLeft : "20px"}}>Latest NFT</h2>

                    <div className="card-sliders">
                        <div className="card-wrapper">
                            <div className="left-icon" onClick={handlePrevClick1}>
                                &lt;
                            </div>
                            <div className="card-container">
                                {nft.slice(currentIndex, currentIndex + 4).map((nftItem, index) => (
                                    <div className="card" key={index} onClick={() => NFTDetail(nftItem.tokenId)}>
                                        <div className="card-image-container">
                                            <img src={nftItem.nftURI} alt={nftItem.nftName} className="card-image" />
                                        </div>
                                        <div className="card-content">
                                            <h3 className="nft-name">{nftItem.nftName}</h3>
                                            <p className="nft-price"> {Web3.utils.fromWei(nftItem.price, 'ether').toString()} ETH</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="right-icon" onClick={handleNextClick1}>
                                &gt;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
