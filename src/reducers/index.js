import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


const mainVideosReducers = (mainVideo = null, action) => {
    if (action.type === 'MAIN_VIDEOS')
        return action.payload;
    return mainVideo;
};

const contentsCondition = (state = null, action) => {
    if(action.type === "CONTENTS")
        return action.payload;
    return state;
}

const seachVideoReducers = (state = null, action) => {
    if(action.type === "SEARCH_VIDEO")
        return action.payload;
    return state;
}

const googleAuthReducers = (state = {isSignedIn: null, userId: null}, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return { ...state, isSignedIn: true, userInfo: action.payload};
        case "SIGN_OUT":
            return { ...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
};

const genderUserEditReducers = (state = "i prefer not to say", action) => {
    if(action.type === "GENDER_USER") {
        return action.payload;
    }
    else if(action.type === "SIGN_IN" && action.payload.gender)
         return action.payload.gender;

    return state;
}

const savesReducers = (state = null, action) => {
    if(action.type === "SAVES")
        return action.payload;
    return state;
}

const saveMessageReducers = (state = null, action) => {
    if(action.type === "SAVE_MESSAGE")
        return action.payload;
    return state;
}

const VideoInfoReducers = (state = null, action) => {
    if(action.type === "VIDEO_INFO")
        return action.payload;
    return state;
}

const showDescriptionVideoReducers = (state = false, action) => {
    if(action.type === "SHOW_DESCRIPTION_VIDEO")
        return action.payload;
    return state;
}

const channelInfoReducers = (state = null, action) => {
    if(action.type === "CHANNEL_INFO")
        return action.payload;
    return state;
}

const channelInfoHomeReducers = (state = null, action) => {
    if(action.type === "CHANNEL_INFO_HOME")
        return action.payload;
    return state;
}



export default combineReducers({
    form: formReducer,
    main: mainVideosReducers,
    contents: contentsCondition,
    seachVideo: seachVideoReducers,
    auth: googleAuthReducers,
    genderUser: genderUserEditReducers,
    saves: savesReducers,
    saveMessage: saveMessageReducers, 
    video: VideoInfoReducers,
    showDescriptionVideo: showDescriptionVideoReducers,
    channel: channelInfoReducers,
    channelHome: channelInfoHomeReducers
});
