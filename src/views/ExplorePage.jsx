import React from 'react';
import './ExplorePage.css'


import BookingList from "../components/Bookings/BookCard";


const ExplorePage = () => {
    return <div className='ExplorePage'>
        <div className='section-text'>
            <h1 className='header-destinations'>Popular destinations</h1>
            <p className='text-destinations'> Most popular glamping destinations across Estonia</p>
        </div>
        <div className='booking-list'>
            <BookingList></BookingList>
        </div>

    </div>
}
export default ExplorePage;