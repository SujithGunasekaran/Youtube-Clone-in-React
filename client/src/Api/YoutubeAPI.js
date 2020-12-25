import axios from 'axios';
const Part = 'snippet';
const MaxResult = 10;


export const YoutubeAPI = axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3',
    params : {
        part : Part,
        maxResults : MaxResult,
    }
})

export const YoutubeVideoAPI = axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3',
})
