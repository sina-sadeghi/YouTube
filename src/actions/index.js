import users from '../components/apis/users';
import YoutubeApi from './YoutubeApi';
import AddUser from './AddUser';


export const mainVideos = sum => async dispatch => {
    const response = await YoutubeApi("mainVideos", sum, null);
    dispatch({ type: "MAIN_VIDEOS", payload: response });
}

export const searcherVideos = (item, sum) => async dispatch => {
    const response = await YoutubeApi("seachVideo", sum, item);
    dispatch({ type: "SEARCH_VIDEO", payload: response });
}
export const emptySearch = () => { return { type: 'SEARCH_VIDEO', payload: [] } }

export const logedIn = username => { return { type: 'USERNAME', payload: username } }

export const signIn = user => async dispatch => {
    const response = await AddUser(user);
    dispatch({ type: "SIGN_IN", payload: response });
}

export const signOut = () => { return { type: "SIGN_OUT" } }

export const genderUserEdit = id => { return { type: 'GENDER_USER', payload: id } }

export const editUser = (id, userInfo) => async (dispatch) => {
    const response = await users.put(`/users/${id}`, userInfo);
    dispatch({ type: "SIGN_IN", payload: response.data });
};

export const showContents = now => {
    var after = true;
    if (now) {
        after = false;
    }
    return {
        type: 'CONTENTS',
        payload: after
    }
}


export const savesVideo = item => async (dispatch, getState) => {
    const { userInfo } = getState().auth;
    const id = userInfo.id;
    const userId = userInfo.userId;

    if (item) {
        const { save } = getState().saves;
        if (save.indexOf(item) > -1)
            var newSaves = save.filter(e => e !== item);
        else
            var newSaves = [...save, item];


        const response = await users.put(`/saves/${id}`, { userId: userId, save: newSaves });
        var saves = response.data
    }
    else {
        const response = await users.get(`/saves/${id}`);
        var saves = response.data
    }

    dispatch({ type: "SAVES", payload: saves });
};

export const hideSaves = () => { return { type: 'SAVES', payload: false } }


export const saveMessager = sum => async (dispatch, getState) => {
    const { userInfo } = getState().auth;
    const id = userInfo.id;
    var response = 'empty';

    const getSavesHost = await users.get(`/saves/${id}`);
    if (getSavesHost.data.save === undefined)
        response = 'empty'
    else
        response = await YoutubeApi("sveaMessage", sum, getSavesHost.data.save.reverse());

    dispatch({ type: "SAVE_MESSAGE", payload: response });
};


export const videoInfo = id => async dispatch => {
    const response = await YoutubeApi("videoInfo", 1, id);
    dispatch({ type: "VIDEO_INFO", payload: response });
}

export const showDescriptionVideo = now => { return { type: 'SHOW_DESCRIPTION_VIDEO', payload: !now } }

export const channelInfo = id => async dispatch => {
    const response = await YoutubeApi("channelInfo", 1, id);
    dispatch({ type: "CHANNEL_INFO", payload: response });
}


export const channelInfoHomeas = (id, num, obj) => async dispatch => {

    const myChannels = [
        "UClgRkhTL3_hImCAmdLfDE4g", "UC-lHJZR3Gqxm24_Vd_AJ5Yw", "UC-9-kyTW8ZkZNDHQJ6FgpwQ",
        "UCEgdi0XIXXZ-qJOFPf4JSKw", "UC295-Dw_tDNtZXFeAPAW6Aw", "UCbCmjCuTUZos6Inko4u57UQ"
    ]

    const response0 = await YoutubeApi("channelInfo", 1, myChannels[0]);
    const response1 = await YoutubeApi("channelInfo", 1, myChannels[1]);
    const response2 = await YoutubeApi("channelInfo", 1, myChannels[2]);
    const response3 = await YoutubeApi("channelInfo", 1, myChannels[3]);
    const response4 = await YoutubeApi("channelInfo", 1, myChannels[4]);
    const response5 = await YoutubeApi("channelInfo", 1, myChannels[5]);
    const response = [response0, response1, response2, response3, response4, response5]


    dispatch({ type: "CHANNEL_INFO_HOME", payload: response });
}