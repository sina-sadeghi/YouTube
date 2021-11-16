import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { mainVideos, savesVideo, hideSaves } from '../../actions';
import Loading from '../OtherPage/Loading';
import './MainVideos.css';

const MainVideos = props => {

    var videos = 12;
    useEffect(() => {
        if (props.isSignedIn.isSignedIn)
            props.savesVideo(null)
        if (props.isSignedIn.isSignedIn === false)
            props.hideSaves()
    }, [props.isSignedIn]);
    useEffect(() => {
        props.mainVideos(videos);
    }, []);


    const showMore = () => {
        videos += 12;
        props.mainVideos(videos)
    }


    const saved = video => {
        if (props.saves)
            return (
                <span
                    className="saveVideo"
                    onClick={() => props.savesVideo(video.id)}
                >
                    <span className="material-icons">
                        {props.saves.save && props.saves.save.indexOf(video.id) > -1 ? "bookmark" : "bookmark_border"}
                    </span>
                </span>
            );
        else
            return false;
    }

    const showVideo = () => {
        if (props.main)
            return (props.main.map(video => {
                var time = video.snippet.publishedAt;

                return (
                    <div key={video.id} className="mainVideo">

                        <Link to={`/video/${video.id}`}>
                            <img alt={video.snippet.title} src={video.snippet.thumbnails.medium.url} />
                        </Link>

                        <div>{video.snippet.title}</div>

                        <div className="dateSaveMainVideo" >
                            <span className="material-icons">schedule</span>
                            <span>
                                {time.slice(0, 4) + '-'
                                    + time.slice(5, 7) + '-'
                                    + time.slice(8, 10) + ' , '
                                    + time.slice(11, 13) + ':'
                                    + time.slice(14, 16) + ':'
                                    + time.slice(17, 19)
                                }
                            </span>
                            <span>
                                {saved(video)}
                            </span>
                        </div>

                        <div className='viewLikeMainVideo' >
                            <span className="material-icons">visibility</span>
                            {video.statistics.viewCount}<br style={{ display: window.innerWidth < 503 ? "block" : "none" }} />
                            <span className="material-icons">thumb_up_off_alt</span>
                            {video.statistics.likeCount}
                        </div>

                    </div>
                );
            }));
        else
            return <div><Loading /></div>;
    }




    return (
        <div
            style={{
                border: "1px solid #e5e5e5",
                gridColumn: (props.contents && window.innerWidth <= 503)
                    || (!props.contents && window.innerWidth > 503)
                    ? "3" : "1/4"
            }}
        >
            <div className="mainVideos">
                {showVideo()}
            </div>

            <div
                style={{ display: props.main && props.main.length < 36 ? "flex" : "none" }}
                className="material-icons"
                onClick={() => showMore()}
            >
                <span>add_circle</span>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        main: state.main,
        contents: state.contents,
        isSignedIn: state.auth,
        saves: state.saves,
    };
};

export default connect(mapStateToProps, { mainVideos, savesVideo, hideSaves })(MainVideos);