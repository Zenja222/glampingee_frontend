import React from 'react'

function VideoBackGround() {
    return (
        <div>
            <div className="video-background-container">
                <video className="video-background" autoPlay loop muted>
                    <source src="'../../assets/video.mp4'" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            );
        </div>
    )
}

export default VideoBackGround
