import youtube from '../components/apis/youtube';

const YoutubeApi = async (type = "mainVideos", num = 10, ids = null) => {

    if (type === "mainVideos") {
        const response = await youtube.get('/videos', {
            params: {
                part: 'snippet, statistics',
                chart: "mostPopular",
                maxResults: num,
                key: 'AIzaSyCKo8LxduRqDC4fsFZjQJQ4moC1K6XRK5w',
            }
        });
        return response.data.items;
    }

    else if(type === "seachVideo"){
        const response = await youtube.get('/search', {
            params: {
                part: 'snippet',
                q: ids,
                maxResults: num,
                key: 'AIzaSyCKo8LxduRqDC4fsFZjQJQ4moC1K6XRK5w',
            }
        });
        return response.data.items;
    }

    else if (type === "sveaMessage") {
        var numSaves = ids.slice(0, num);
        const response = await youtube.get('/videos', {
            params: {
                part: 'snippet, statistics',
                id: numSaves.toString(),
                key: 'AIzaSyCKo8LxduRqDC4fsFZjQJQ4moC1K6XRK5w',
            }
        });
        return response.data.items;
    }

    else if (type === "videoInfo") {
        const response = await youtube.get('/videos', {
            params: {
                part: 'snippet, statistics',
                id: ids,
                key: 'AIzaSyCKo8LxduRqDC4fsFZjQJQ4moC1K6XRK5w',
            }
        });
        return response.data.items[0];
    }

    else if (type === "channelInfo") {
        const response = await youtube.get('/channels', {
            params: {
                part: 'snippet, contentDetails, statistics',
                id: ids,
                key: 'AIzaSyCKo8LxduRqDC4fsFZjQJQ4moC1K6XRK5w',
            }
        });
        return response.data.items[0];
    }

    else
        return "Invalid type!";
}
export default YoutubeApi;