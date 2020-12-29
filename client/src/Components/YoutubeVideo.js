import React from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';


function YoutubeVideo(props)
{    
    const { videoID, videoHeight, videoList } = props;
    return(
        <div>
            <div className="video-main">
                <iframe 
                    width = "100%" 
                    height = { videoHeight } 
                    src={`https://www.youtube.com/embed/${videoID}`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                />
                {
                    videoList !== undefined && videoList.data.items.map(( videoInfo, index ) => (
                        videoInfo.id.videoId === videoID ? 
                        <div key={ index }>
                            <div className="video-main-title">{ videoInfo.snippet.title }</div>
                            <div className="video-main-published-display">
                                <div className="video-main-published">Published At : { videoInfo.snippet.publishedAt.split(/T/g)[0] }</div>
                                <div className="video-main-icon-container">
                                    <ThumbUpAltIcon className="video-main-like-icon" style={{ marginRight:'18px' }} />
                                    <ThumbDownIcon className="video-main-like-icon"  />
                                </div>
                            </div>
                            <hr className="video-main-hr" />
                            <div className="video-main-channel-display">
                                <div className="video-main-channel-name">{ videoInfo.snippet.channelTitle }</div>
                                <button className="video-main-subscribe-btn">Subscribe</button>
                            </div>
                        </div> : null
                    ))
                }
            </div>
        </div>
    )
}

export default YoutubeVideo