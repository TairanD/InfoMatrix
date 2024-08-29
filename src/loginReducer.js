const iniState = {
    isAuthenticated: false,
    userAvatar: '',
    ifStaff: false,
    userEmail: '',
    userName: ''
};

const reducer = (state = iniState, action) => {
    switch (action.type){
        case 'login':
            return {
                ...state,
                isAuthenticated: true,
                userAvatar: action.userAvatar,
                ifStaff: action.ifStaff,
                userEmail: action.userEmail,
                userName: action.userName
            }
        case 'logout':
            return{
                ...state,
                isAuthenticated: false,
                userAvatar: '',
                userRole: false,
                userEmail: '',
                userName: ''
            }
    }
    return state;
}

export default reducer;