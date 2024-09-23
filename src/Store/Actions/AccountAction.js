const SIGN_IN = 'LOGIN';
const SIGN_OUT = 'LOGOUT';
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

export { SIGN_IN, SIGN_OUT, UPDATE_ACCOUNT };

const SignInAction = (payload) => {
    return {
        type: SIGN_IN,
        payload: payload,
    };
};

const SignOutAction = () => {
    return {
        type: SIGN_OUT,
    };
};

const UpdateAccountAction = (payload) => {
    return {
        type: UPDATE_ACCOUNT,
        payload: payload,
    };
};

export { SignInAction, SignOutAction, UpdateAccountAction };
