import React from 'react';
import MenuBtn from "../components/MenuBtn";

function Home(){

    // const [isSignUpActive, setIsSignUpActive] = useState(false);
    // // const handleMethodChange = () => {
    // //     setIsSignUpActive(!isSignUpActive)
    // // }

    return (
        <div className='home-page'>
            <header className='h-100 min-vh-100 d-flex align-items-center text-light shadow'
                    style={{ backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/5e860a53c389ed733f4ddc25/a325a3c9-7c2c-4d07-bf81-677a9c7c4bfb/maidla-nature-resort-unique-place-to-stay-nature-villa-poku-05.jpg?format=1000w)', backgroundSize: 'cover', backgroundPosition: 'center' }}>>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-6 d-flex d-sm-block flex-column align-items-center'>
                            <h2 className='mb-0  fw-bold'> Welcome To</h2>
                            <h1 className='mb-5  fw-bold text-sm-start '>
                                Estonian Glampings  </h1>
                             <MenuBtn/>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
export default Home;
