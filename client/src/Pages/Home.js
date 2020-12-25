import React, { useEffect, useState, lazy, Suspense } from 'react';
import Header from '../Components/Header';
import { YoutubeAPI, YoutubeVideoAPI } from '../Api/YoutubeAPI';
import { YoutubeAPIKey } from '../Api/YoutubeAPIKey';
import VideoSizeList from '../json/videoSize.json';
import ProgressBar from '../Components/ProgressBar';
import '../css/home.css';

const VideoList = lazy(()=> import('../Components/VideoList'))
const YoutubeVideo = lazy(()=>import('../Components/YoutubeVideo'))

function Home(){
  
    const [ searchValue, setSearchValue ] = useState('');
    const [ videoList, setVideoList ] = useState()
    const [ selectedVideo, setSelectedVideo ] = useState();
    const [ stringLength, setStringLength ] = useState(45);
    const [ videoHeight, setVideoHeight ] = useState();
    const [ videoID, setVideoID ] = useState('');
    const [ showProgressBar, setShowProgressBar ] = useState(0)

    var DefaultSearch = "Reactjs";

    useEffect(() =>{
      getYoutubeResponse()
      if(window.innerWidth < 440){
        setStringLength(25)
      }
      var videoHeight;
      Object.keys(VideoSizeList).map(( screenSize ) => {
        if(window.innerWidth >= Number(screenSize)){
          videoHeight = VideoSizeList[screenSize].height
        } 
        setVideoHeight(videoHeight)
      })
    },[])

    const getYoutubeResponse = async () =>{
      setShowProgressBar(true)
      var searchQuery = searchValue !== '' ? searchValue : DefaultSearch;
      const result = await YoutubeAPI.get('/search',{
        params : {
          q : searchQuery,
          key : YoutubeAPIKey
        }
      })
      .then((responseData) =>{
        getVideo(responseData.data.items[1].id.videoId, "videos")
           setShowProgressBar(false)
        return responseData.data
      })
      .catch((err)=>{
            setShowProgressBar(false)
        console.log(err)
      })
      setVideoList(result)
    }

    const getVideo = async (videoId,videoType) =>{
      window.scrollTo({ top : 0, behavior : 'smooth' })
      setShowProgressBar(true)
      setVideoID(videoId)
      if(videoType === 'videos'){
        await YoutubeVideoAPI.get(`/${videoType}`,{
          params : {
            part : 'snippet',
            id : videoId,
            key : YoutubeAPIKey
          }
        })
        .then((responseData) => {
          setShowProgressBar(false)
          setSelectedVideo(responseData.data)
        })
        .catch((err)=>{
          setShowProgressBar(false)
          console.log(err)
        })
      }
      else if(videoType === 'playlistItems'){
        await YoutubeVideoAPI.get(`/${videoType}`,{
          params : {
            part : 'snippet',
            playlistId : videoId,
            key : YoutubeAPIKey
          }
        })
        .then((responseData) => {
          setShowProgressBar(false)
          setSelectedVideo(responseData.data)
        })
        .catch((err)=>{
          setShowProgressBar(false)
          console.log(err)
        })
      }
    }

    const handleSearch = (e) =>{
      setSearchValue(e.target.value)
    }

    const handleSearchSubmit = (e) =>{
      e.preventDefault()
      getYoutubeResponse();
    }

    document.title = "VideoWeb | Home"
    
    return(
        <div className="home-main-main">
            <Header 
              searchValue = {searchValue}
              handleSearch = { handleSearch }
              handleSearchSubmit = { handleSearchSubmit }
            />
            {
              showProgressBar ? 
              <div className="sticky-progress-bar">
                <ProgressBar />
              </div> : null
            }
            <div className="home-main">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-8">
                    <Suspense fallback={<div>Loading...</div>}>
                      <YoutubeVideo 
                        videoID = { videoID }
                        selectedVideo = { selectedVideo }
                        videoHeight = { videoHeight }
                      />
                    </Suspense>
                  </div>
                  <div className="col-md-4">
                    <Suspense fallback={<div>Loading...</div>}>
                      <VideoList 
                        videoList = { videoList }
                        stringLength = { stringLength }
                        getVideo = { getVideo }
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )

}

export default Home