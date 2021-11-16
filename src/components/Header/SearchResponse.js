import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { emptySearch } from '../../actions';
import ContentsMenu from '../ContentsMenu/ContentsMenu';
import './SearchResponse.css';
/*
return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
    */
const SearchResponse = props => {

    useEffect(() => {
        return () => {
            emptySearch();
        };
    })

    const showResponse = () => {
        if (props.seachVideo)
            return (props.seachVideo.map(video => {
                var time = video.snippet.publishedAt;

                return (
                    <div key={video.snippet.title} className="searchVideo">
                        <Link to={`/video/${video.id.videoId}`}>
                            <div className="explanationSearchVideo">
                                <img
                                    alt={video.snippet.title}
                                    src={video.snippet.thumbnails.medium.url}
                                    style={{ border: "2px inset #e7e7e7" }}
                                />
                                <div>
                                    <span className="titleSearchVideo">{video.snippet.title}</span>
                                    <div>
                                        <span className="material-icons">schedule</span>
                                        <span className="searchVideoHistory">
                                            {' ' + time.slice(0, 4) + ' - ' + time.slice(5, 7) + ' - ' + time.slice(8, 10)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <hr />
                    </div>
                );
            }))
        else
            return <div className="emptySeach" >Please search something<br /><div className="material-icons">sentiment_dissatisfied</div></div>
    }

    return (
        <div>
            <div className={props.contents ? "videoContentsMenu" : ""} ><ContentsMenu /></div>
            <div className="resultSearchVideo">Result of your search:</div>
            {showResponse()}
        </div>
    );
}

const mapStateToProps = (state) => {
    return { seachVideo: state.seachVideo, contents: state.contents, };
};

export default connect(mapStateToProps, { emptySearch })(SearchResponse);