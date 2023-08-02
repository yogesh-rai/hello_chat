export const getUsersName = (loggedUser, users) => {
    if (!users || users?.length <= 0) return;
    const userName =  users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    return userName;
}