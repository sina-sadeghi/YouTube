import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { videoInfo, showDescriptionVideo, savesVideo, channelInfo } from '../../actions';
import ContentsMenu from '../ContentsMenu/ContentsMenu';
import Loading from '../OtherPage/Loading';
import '../Videos/Videos.css';

const Videos = props => {

    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


    useEffect(() => {
    if (props.video && props.video.id !== window.location.pathname.slice(7))
        window.location.reload();
    if (!props.video) {
        props.videoInfo(window.location.pathname.slice(7));
        showDescriptionVideo(true)
    }
    if (props.video && !props.channel)
        props.channelInfo(props.video.snippet.channelId)

    if (props.isSignedIn.isSignedIn)
        props.savesVideo(null)
    }, [props.isSignedIn, props.video, props.channel]);

    const saved = () => {
        if (props.saves)
            return (
                <span className="material-icons" title="save" onClick={() => props.savesVideo(props.video.id)} >
                    {props.saves.save && props.saves.save.indexOf(props.video.id) > -1 ? "bookmark" : "bookmark_border"}
                </span>
            );
        else
            return false;
    }


    const showVideo = () => {
        if (props.video && props.channel) {
            var time = props.video.snippet.publishedAt;
            var timeChan = props.channel.snippet.publishedAt;

            return (
                <div className='videos'>
                    <div>
                        <iframe
                            title="YouTube video"
                            height={width > height ? height : width * 3 / 4}
                            src={`https://www.youtube.com/embed/${props.video.id}`}
                        />

                        <div className='titleHistoryVideo'>
                            <span className='titleVideo'>{props.video.snippet.localized.title}</span>
                            <span title="default language" >
                                <span style={{ border: props.video.snippet.defaultAudioLanguage ? "1px solid" : 'none' }}>
                                    {props.video.snippet.defaultAudioLanguage}
                                </span>
                            </span>

                            <div>
                                <span className="material-icons">schedule </span>
                                <span>{
                                    time.slice(0, 4) + '-' +
                                    time.slice(5, 7) + '-' +
                                    time.slice(8, 10) + ' , ' +
                                    time.slice(11, 13) + ':' +
                                    time.slice(14, 16) + ':' +
                                    time.slice(17, 19)
                                }
                                </span>
                            </div>
                        </div>

                        <div className='numberActionVideoDiv'>
                            <span className='numberActionVideoV'>
                                <span className="material-icons" title="view" >visibility </span>
                                <span className='numberActionVideo'>{props.video.statistics.viewCount}</span>
                            </span>
                            <span></span>
                            <span className='numberActionVideoL'>
                                <span className="material-icons" title="likes" >thumb_up_off_alt </span>
                                <span className='numberActionVideo'>{props.video.statistics.likeCount}</span>
                            </span>
                            <span></span>
                            <span className='numberActionVideoDL'>
                                <span className="material-icons" title="dslikes" >thumb_down_off_alt </span>
                                <span className='numberActionVideoD'>{props.video.statistics.dislikeCount}</span>
                            </span>
                            <span></span>
                            <span className='numberActionVideoC'>
                                <span className="material-icons" title="comments" >chat_bubble_outline</span>
                                <span className='numberActionVideo'>{props.video.statistics.commentCount}</span>
                            </span>
                            <span></span>
                            <span className="saveVideo">{saved()}</span>
                        </div>
                    </div>



                    <div>
                        <div className='descriptionVideo'>
                            description:
                            <pre style={{ display: props.showDescription ? "inline" : "none" }} >
                                <br />
                                {props.video.snippet.description}
                                <br />
                            </pre>

                            <span onClick={() => props.showDescriptionVideo(props.showDescription)} >
                                <span>{!props.showDescription ? "show" : "hide"}</span>
                            </span>
                        </div>

                        <div className='tagsVideo'>
                            tags: {props.video.snippet.tags ? props.video.snippet.tags.slice(0, 5).join('  -  ') : 'empty'}
                        </div>
                    </div>



                    <div className="channelVideo">
                        <img alt={props.channel.snippet.title} src={props.channel.snippet.thumbnails.medium.url} />
                        <div className="channelVideoInfo">
                            <div className="channelVideoTitle">{props.channel.snippet.title}</div>
                            <div className="channelVideoSubscriber">
                                subscriber: {!props.channel.statistics.hiddenSubscriberCount ? props.channel.statistics.subscriberCount : "hidden"}
                                <br />
                                videos: {props.channel.statistics.videoCount}
                            </div>
                            <div className="channelVideocreated">
                                created in: {timeChan.slice(0, 4) + ' - ' + timeChan.slice(5, 7) + ' - ' + timeChan.slice(8, 10)}
                            </div>
                        </div>

                        <div className="channelVideoInYoutube">
                            <a href={`https://youtube.com/channel/${props.channel.id}`}>View on YouTube</a>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return <div><Loading /></div>;
    }


    return (
        <div>
            <div className={props.contents ? "videoContentsMenu" : ""} ><ContentsMenu /></div>
            {showVideo()}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        video: state.video,
        showDescription: state.showDescriptionVideo,
        contents: state.contents,
        saves: state.saves,
        channel: state.channel,
        isSignedIn: state.auth
    };
}

export default connect(mapStateToProps, { videoInfo, showDescriptionVideo, savesVideo, channelInfo })(Videos);