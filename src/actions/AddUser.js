import users from '../components/apis/users';


const getUser = async () => {
    const response = await users.get('/users');
    return response.data;
}

const AddUser = async newUser => {


    const userInfo = {
        userId: newUser.uT,
        email: newUser.Yt,
        firstName: newUser.JU,
        lastName: newUser.$S,
        image: newUser.pK
    }


    let userId = false;
    const response = await getUser().then(r => {
        r.map(user => {
            if (user.userId === newUser.uT)
                userId = user;
        })
        return userId;
    })

    if (!response) {
        const addUserSaves = async () => {
            await users.post('/saves', { userId: newUser.uT, save: [] });
        }
        const addUser = async () => {
            const info = await users.post('/users', userInfo);

            return info.data;
        }
        addUserSaves();
        addUser();
    }

    return response;

}
export default AddUser;