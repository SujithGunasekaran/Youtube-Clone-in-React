import React from 'react';


function VideoList(props){

    const { stringLength, videoList, getVideo } = props;

    const dateCalculation = (videoPublishedDate) => {
        var publishedDate = videoPublishedDate.split(/T/g)[0]
        var splitedDate = publishedDate.split(/-/g);
        var currentDate = new Date();
        var year = calculateYear(splitedDate[0], currentDate)
        var month = calculateMonth(splitedDate[1], currentDate)
        var date = calculateDate(splitedDate[2], currentDate)
        if(year > 0){
            return year+' Year'
        }
        else if(month > 0){
            return month+' Month'
        }
        else if(date > 0){
            return date+' Day'
        }
    }

    const calculateYear = (date, currentDate) => {
        return currentDate.getFullYear() - date
    }

    const calculateMonth = (date, currentDate) => {
        return currentDate.getMonth() - date
    }

    const calculateDate = (date, currentDate) => {
        return currentDate.getDate() - date
    }

    return(
        <div className="videoList-main">
            {
                videoList !== undefined && videoList.items.map(( videoInfo, index ) => (
                    <div key={index} 
                        onClick={()=>getVideo(videoInfo.id.videoId ? videoInfo.id.videoId : videoInfo.id.playlistId, videoInfo.id.videoId ? "videos" : "playlistItems")}>
                        <div className="videoList-display">
                            <img src={ videoInfo.snippet.thumbnails.default.url }  className="videoList-image" alt={videoInfo.snippet.channelTitle}/>
                            <div className="videoList-info-display">
                                <div className="videoList-info-title">
                                    { videoInfo.snippet.title.slice(0,stringLength) }{ videoInfo.snippet.title.length > stringLength ? '....' : null }
                                </div>
                                <div className="videoList-info-channel-title">
                                    { videoInfo.snippet.channelTitle }
                                </div>
                                <div className="videoList-info-channel-title">
                                    {dateCalculation(videoInfo.snippet.publishedAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )

}

export default VideoList