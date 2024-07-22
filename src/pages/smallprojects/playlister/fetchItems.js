import axios from "axios"
const fetchPlaylistItems=async (apikey,playlist, pageToken='')=>{
    let items=[]
    try {

        const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems',{params:{
            part:'snippet',
            playlistId: playlist,
            key:apikey,
            pageToken: pageToken,
            maxResults:5
        }})
        items= response.data.items
        let nextPageToken=response.data.nextPageToken || ''
        let prevPageToken = response.data.prevPageToken || ''
        console.log(response)
        
    return {items,nextPageToken,prevPageToken}
    } catch (error) {
        console.error("error fetching details")
        return null;
    }
}

export default fetchPlaylistItems