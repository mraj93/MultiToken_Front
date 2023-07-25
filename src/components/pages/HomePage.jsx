import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../CSS/homepage.css';


const HomePage = () => {
    const sliderRef = useRef(null);
    const cardContainerRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollAmount, setScrollAmount] = useState(0);

    const cardsPerPage = 3;
    const cardWidthPercentage = 100 / cardsPerPage;

    const handleScrollLeft = () => {
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleScrollRight = () => {
        setCurrentIndex((prevIndex) => Math.min(cards.length - cardsPerPage, prevIndex + 1));
    };

    const cards = [
        {
            imageSrc: 'https://example.com/nft-card-1.jpg',
            title: 'NFT Card 1',
            description: 'This is the description of NFT Card 1.',
        },
        {
            imageSrc: 'https://example.com/nft-card-2.jpg',
            title: 'NFT Card 2',
            description: 'This is the description of NFT Card 2.',
        },
        {
            imageSrc: 'https://example.com/nft-card-2.jpg',
            title: 'NFT Card 2',
            description: 'This is the description of NFT Card 2.',
        },
        {
            imageSrc: 'https://example.com/nft-card-2.jpg',
            title: 'NFT Card 2',
            description: 'This is the description of NFT Card 2.',
        },
        {
            imageSrc: 'https://example.com/nft-card-2.jpg',
            title: 'NFT Card 2',
            description: 'This is the description of NFT Card 2.',
        },
    ];

    const cardWidth = cardWidthPercentage;

    const cardStyle = {
        flexBasis: `${cardWidth}%`,
        maxWidth: `${cardWidth}%`,
    };

    const translateX = -(currentIndex * cardWidthPercentage);

    const handleNextClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="your-slider-container">
            <Slider {...settings} ref={sliderRef}>
                <div className="slider-item">
                    <img
                        src="https://i0.wp.com/cbaatthebar.chicagobar.org/wp-content/uploads/2021/04/NFT.jpg?w=788&ssl=1"
                        alt="Slide 1"
                        className="slider-image"
                        style={{ width: '100%', height: '700px' }}
                    />
                </div>
                <div className="slider-item">
                    <img
                        src="https://mudrex.com/blog/wp-content/uploads/2023/06/WhatsApp-Image-2023-05-05-at-2.59.53-PM-2.jpeg"
                        alt="Slide 2"
                        className="slider-image"
                        style={{ width: '100%', height: '700px' }}
                    />
                </div>
                <div className="slider-item">
                    <img
                        src="https://s3.amazonaws.com/assets.coingecko.com/app/public/ckeditor_assets/pictures/1757/content_nft.png"
                        alt="Slide 3"
                        className="slider-image"
                        style={{ width: '100%', height: '700px' }}
                    />
                </div>
            </Slider>
            <div className="custom-next-icon" onClick={handleNextClick}>
                &gt;
            </div>

            <section className="nft-marketplace-section my-2 mx-3">

                <div className="container">
                    <div className="section-content">
                        <h2 className="get-started-button">Latest NFT</h2>
                    </div>
                </div>

                <div className="card-wrapper">
                    <div className="card-container" ref={cardContainerRef} style={{ transform: `translateX(${translateX}%)` }}>
                        {cards.map((card, index) => (
                            <div className="card" key={index} style={cardStyle}>
                                <img src={card.imageSrc} alt={card.title} className="card-image" />
                                <div className="card-content">
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                </div>
                            </div>
                        ))}

                        {/*<div className="card">
                            <img src="https://example.com/nft-card-1.jpg" alt="NFT Card 1" className="card-image"/>
                            <div className="card-content">
                                <h3>NFT Card 1</h3>
                                <p>This is the description of NFT Card 1.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src="https://example.com/nft-card-2.jpg" alt="NFT Card 2" className="card-image"/>
                            <div className="card-content">
                                <h3>NFT Card 2</h3>
                                <p>This is the description of NFT Card 2.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src="https://example.com/nft-card-2.jpg" alt="NFT Card 2" className="card-image"/>
                            <div className="card-content">
                                <h3>NFT Card 2</h3>
                                <p>This is the description of NFT Card 2.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src="https://example.com/nft-card-2.jpg" alt="NFT Card 2" className="card-image"/>
                            <div className="card-content">
                                <h3>NFT Card 2</h3>
                                <p>This is the description of NFT Card 2.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src="https://example.com/nft-card-2.jpg" alt="NFT Card 2" className="card-image"/>
                            <div className="card-content">
                                <h3>NFT Card 2</h3>
                                <p>This is the description of NFT Card 2.</p>
                            </div>
                        </div>*/}

                    </div>
                </div>

                <div className="arrow-buttons">
                    <button className="arrow-button left" onClick={handleScrollLeft}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className="arrow-button right" onClick={handleScrollRight}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </section>

            <div>
                hdscd
            </div>

        </div>
    );
}

export default HomePage;