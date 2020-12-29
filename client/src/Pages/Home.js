import React, { useEffect, useState, lazy, Suspense } from 'react';
import Header from '../Components/Header';
import { YoutubeAPI } from '../Api/YoutubeAPI';
import { YoutubeAPIKey } from '../Api/YoutubeAPIKey';
import VideoSizeList from '../json/videoSize.json';
import ProgressBar from '../Components/ProgressBar';
import '../css/home.css';

const VideoList = lazy(()=> import('../Components/VideoList'))
const YoutubeVideo = lazy(()=>import('../Components/YoutubeVideo'))

function Home(){
  
    const [ searchValue, setSearchValue ] = useState('');
    const [ videoList, setVideoList ] = useState()
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
      .finally(() => { setShowProgressBar(false) })
      setVideoListId(result.data.items[1].id.videoId)
      setVideoList(result)
    }
  
    const setVideoListId = (videoId) => {
      window.scrollTo({ top : 0, behavior : 'smooth' })
      setVideoID(videoId)
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
                        videoList = { videoList }
                        videoHeight = { videoHeight }
                      />
                    </Suspense>
                  </div>
                  <div className="col-md-4">
                    <Suspense fallback={<div>Loading...</div>}>
                      <VideoList 
                        videoList = { videoList }
                        stringLength = { stringLength }
                        setVideoListId = { setVideoListId }
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