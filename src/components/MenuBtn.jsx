import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function MenuBtn() {
    const { t } = useTranslation();  // useTranslation hook to access the translation function

    return (
        <div>
            <Link to='/explore'>
                <Button
                    href='/register'
                    className='btn btn-warning text-uppercase fw-semibold ms-2'
                    style={{ backgroundColor: '#ff9f00', border: 'none' }}
                >
                    {t('explore')}
                </Button>
            </Link>
        </div>
    );
}

export default MenuBtn;