import React from 'react';
import './booking.css'



const Booking = ({ image, description, location }) => {
    return (
        <div className="booking">
            <img src={image} alt="Card image" className="card-image" />
            <div className="card-body">
                <h3>{description}</h3>
                <p>{location}</p>
            </div>
        </div>
    );
};


const BookingList = () => {
    const bookings = [
        {
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.N2OgMsXP3ZVmznSh7jxRuwHaE8%26pid%3DApi&f=1&ipt=7b19a27910a54ee2a310fd0f12f8aef0a16a7706112730a81e25cdf23371f6a6&ipo=images',
            description: 'Beautiful Beach',
            location: 'Maldives',
        },
        {
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.MqgkR1ayyeJEB3Q_-qp52gHaFj%26pid%3DApi&f=1&ipt=27b28eb85d4d8f4ee908fc08a77e9fcc2b8205bc4bbeb5099371e8beb822f80c&ipo=images',
            description: 'Mountain Hike',
            location: 'Switzerland',
        },
        {
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.AFLjcNpDe1vqILWCF5rgpwHaE7%26pid%3DApi&f=1&ipt=50f608ab43f7751776de0ae9938c731180d51e50091078f3c22c762d74b35efa&ipo=images',
            description: 'Cityscape View',
            location: 'New York, USA',
        },
    ];
    return (
        <div className="booking-list">
            {bookings.map((booking, index) => (
                <Booking
                    key={index}
                    image={booking.image}
                    description={booking.description}
                    location={booking.location}
                />
            ))}
        </div>
    );
};

export default BookingList;