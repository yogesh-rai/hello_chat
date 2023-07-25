export const getUsersName = (loggedUser, users) => {
    const userName =  users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    return userName;
}