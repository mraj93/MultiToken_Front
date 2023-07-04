import React, {useEffect, useRef} from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CSS/homepage.css';

// import Banner from '../images/NFT.png';

const HomePage = () => {

    const sliderRef = useRef(null);

    // useEffect(() => {
    //     $(sliderRef.current).slick({
    //         dots: true,
    //         infinite: true,
    //         speed: 500,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         autoplay: true,
    //         autoplaySpeed: 3000, // Adjust the duration between slides (in milliseconds)
    //         prevArrow: '<div class="slider-arrow prev-arrow"></div>',
    //         nextArrow: '<div class="slider-arrow next-arrow"></div>',
    //     });
    // }, []);

    const settings = {
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000
    };

    return(
        <>
            <div>
                <Slider {...settings} >
                    <div>
                        <img
                            src="https://i0.wp.com/cbaatthebar.chicagobar.org/wp-content/uploads/2021/04/NFT.jpg?w=788&ssl=1" alt="Slide 1"
                            style={{ width: '100%', height: '600px' }} />
                    </div>
                    <div>
                        <img
                            src="https://mudrex.com/blog/wp-content/uploads/2023/06/WhatsApp-Image-2023-05-05-at-2.59.53-PM-2.jpeg" alt="Slide 1"
                            style={{ width: '100%', height: '600px' }} />
                    </div>
                    <div>
                        <img src="https://s3.amazonaws.com/assets.coingecko.com/app/public/ckeditor_assets/pictures/1757/content_nft.png" alt="Slide 1"
                             style={{ width: '100%', height: '600px' }} />
                    </div>
                </Slider>
            </div>
            {/*</div>*/}
        </>
    );
};

export default HomePage;