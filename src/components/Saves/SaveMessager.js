import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { savesVideo, saveMessager } from '../../actions';
import ContentsMenu from '../ContentsMenu/ContentsMenu';
import GoogleAuth from '../Profile/GoogleAuth';
import Loading from '../OtherPage/Loading';
import InAccessible from '../OtherPage/InAccessible';
import '../HomePage/MainVideos.css';


const SaveMessager = props => {
    var x = 10;

    useEffect(() => {
        if (props.isSignedIn.isSignedIn && !props.saveMessage) {
            props.saveMessager(x)
            props.savesVideo(null)
        }

    }, [props.isSignedIn, props.saveMessage, props.saves]);
    useEffect(() => {
        if (props.saveMessage)
            props.saveMessager(x)
    }, [props.saves]);

    const showMore = () => {
        x += 10;
        props.saveMessager(x)
    }


    const showVideo = () => {
        if (props.isSignedIn.isSignedIn && props.saveMessage)
            if (props.saveMessage !== "empty")
                return (props.saveMessage.map(video => {
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
                                    {time.slice(0, 4) + '-' +
                                        time.slice(5, 7) + '-' +
                                        time.slice(8, 10) + ' , ' +
                                        time.slice(11, 13) + ':' +
                                        time.slice(14, 16) + ':' +
                                        time.slice(17, 19)
                                    }
                                </span>

                                <span className="saveVideo" onClick={() => props.savesVideo(video.id)} >
                                    <span className="material-icons">
                                        bookmark
                                    </span>
                                </span>
                            </div>

                            <div className='viewLikeMainVideo' >
                                <span className="material-icons">visibility</span>
                                {video.statistics.viewCount}
                                <span className="material-icons">thumb_up_off_alt</span>
                                {video.statistics.likeCount}
                            </div>
                        </div>
                    );
                }));
            else
                return (
                    <div style={{ fontSize: "350%", color: "#ff1212" }}>
                        Saved is empty
                    </div>
                );
        else if (props.isSignedIn.isSignedIn === false)
            return (
                <div>
                    <div className={props.contents ? "videoContentsMenu" : ""} ><ContentsMenu /></div>
                    <InAccessible />
                </div>
            );
        else
            return <div><Loading /></div>
    }
    return (
        <div>
            <div className="titleSaveMessage">
                <h2><span className="material-icons" >bookmarks</span><span> Save Message</span></h2>
            </div>

            <div className="saveMessage">
                <ContentsMenu />
                <div style={{
                    border: "1px solid #e5e5e5",
                    gridColumn: props.contents ? "3" : "1/4",
                    height: "calc(100% + 20px)"
                }}>
                    <div className="mainVideos">
                        {showVideo()}
                    </div>
                    <div
                        style={{
                            display: props.isSignedIn.isSignedIn &&
                                props.saveMessage &&
                                props.saveMessage.length <= 10 ?
                                "flex" : "none"
                        }}
                        className="material-icons"
                        onClick={() => showMore()}>
                        <span>add_circle</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth, contents: state.contents, saves: state.saves, saveMessage: state.saveMessage };
};

export default connect(mapStateToProps, { savesVideo, saveMessager })(SaveMessager);