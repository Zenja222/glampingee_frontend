import React from 'react';
import MenuBtn from "../components/MenuBtn";
import backgroundImage from '../../src/assets/images/8410.jpg';
import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation(); // Initialize translation hook

    return (
        <div className='home-page'>
            <header
                className='h-100 min-vh-100 d-flex align-items-center text-light shadow'
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-6 d-flex d-sm-block flex-column align-items-center'>
                            <h2 className='mb-0 fw-bold'>{t('welcome_to')}</h2>
                            <h1 className='mb-5 fw-bold text-sm-start'>
                                {t('est_glampings')}
                            </h1>
                            <MenuBtn />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Home;
