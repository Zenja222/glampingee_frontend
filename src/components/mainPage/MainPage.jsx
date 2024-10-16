import "./MainPage.css"
import Video from '../../assets/video.mp4'
import {useEffect} from "react";

const MainPage = () =>  {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.overflow = 'auto';
    })
    return <div className='mainpage'>
        <div className='videoBg'>
            <video src={Video} autoPlay loop muted></video>
        </div>
        <div className='section-text'>
            <h1>Unlock your Glamping experience with us</h1>
            <p>
                Discover the Estonia's most unique nature and houses
            </p>
            <button className="start-button">GET STARTED</button>
        </div>
    </div>
}
export default MainPage;
