import React from 'react';
import { connect } from 'react-redux';
import { channelInfoHomeas } from '../../actions';
import Loading from '../OtherPage/Loading';
import '../Videos/Videos.css';

const Channel = props => {

    if (!props.channelHome)
        props.channelInfoHomeas()


    const showChannel = () => {
        if (props.channelHome)
            return props.channelHome.map(channel => {
                var timeChan = channel.snippet.publishedAt;

                return (
                    <div
                        key={channel.id}
                        className="channelVideoHome"
                        data-aos="fade-right"
                        data-aos-anchor-placement="bottom-bottom"
                        data-aos-duration="6000"
                    >
                        <div className="channelVideo">
                            <img alt={channel.snippet.title} src={channel.snippet.thumbnails.medium.url} />

                            <div>
                                <div className="channelVideoTitle">{channel.snippet.title}</div>

                                <div className="channelVideoSubscriber">
                                    subscriber: {!channel.statistics.hiddenSubscriberCount ? channel.statistics.subscriberCount / 1000000 + 'M' : "hidden"}
                                    <br />
                                    videos: {channel.statistics.videoCount}
                                </div>

                                <div className="channelVideocreated">
                                    created in: {timeChan.slice(0, 4) + ' - ' + timeChan.slice(5, 7) + ' - ' + timeChan.slice(8, 10)}
                                </div>
                            </div>

                            <div>
                                <a href={`https://youtube.com/channel/${channel.id}`}>View on YouTube</a>
                            </div>
                        </div>
                    </div>
                )
            })
        else
            return <div><Loading /></div>
    }



    return (
        <div style={{ gridColumn: "1/4" }}>
            <div className="titleChannelsVideoHome">Some of the top channels on YouTube:</div>
            {showChannel()}
        </div>
    );
}

const mapStateToProps = state => {
    return { channelHome: state.channelHome };
}

export default connect(mapStateToProps, { channelInfoHomeas })(Channel);