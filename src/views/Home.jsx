import React, { useState, useEffect } from 'react';
import MenuBtn from "../components/MenuBtn";
import backgroundImage from '../../src/assets/images/8410.jpg';
import { useTranslation } from 'react-i18next';
import { getAll } from "../client/BookingManagement";
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Home() {
    const { t, i18n } = useTranslation();
    const [topGlampings, setTopGlampings] = useState([]);
    const currentLanguage = i18n.language;
    const navigate = useNavigate();

    useEffect(() => {
        const loadTopRatedGlampings = async () => {
            try {
                const allGlampings = await getAll();
                const topRated = allGlampings
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 8); // Get the top 8 highest-rated glampings
                setTopGlampings(topRated);
            } catch (error) {
                console.error("Failed to load top-rated glampings", error);
            }
        };

        loadTopRatedGlampings();
    }, []);

    const handleCarouselClick = (id) => {
        navigate(`/glamping/${id}`);
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,  // Show 4 items at a time on desktop
            slidesToSlide: 1, // Slide 1 item at a time
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
        }
    };

    return (
        <div className='home-page'>
            <header
                className='h-100 min-vh-100 d-flex align-items-center text-light shadow flex-column justify-content-center'
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className='container text-center mt-2'>
                    <h2 className='mb-0 fw-bold'>{t('welcome_to')}</h2>
                    <h1 className='mb-4 fw-bold'>{t('est_glampings')}</h1>
                    <MenuBtn/>

                    <div className="carousel-container mt-5"
                         style={{backgroundColor: 'transparent', padding: '20px', borderRadius: '10px'}}>
                        <h3 className="text-center mb-4">{t('Top Rated')}</h3>
                        {topGlampings.length > 0 && (
                            <Carousel responsive={responsive} infinite={true}>
                                {topGlampings.map((glamping, index) => (
                                    <div key={index} className="carousel-item-container"
                                         onClick={() => handleCarouselClick(glamping.id)}
                                         style={{cursor: 'pointer', padding: '0 10px'}}>
                                        <img
                                            className="d-block w-100"
                                            src={glamping.picture[0] || "https://via.placeholder.com/150"}
                                            alt={glamping.name[currentLanguage] || t('name_not_available')}
                                            style={{height: '200px', borderRadius: '10px', objectFit: 'cover'}}
                                        />
                                        <div className="text-center mt-2">
                                            <h5>{glamping.name[currentLanguage] || t('name_not_available')}</h5>
                                            <p>{glamping.county || t('county_not_available')}</p>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Home;
