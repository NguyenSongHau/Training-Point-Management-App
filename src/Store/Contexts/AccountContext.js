import { createContext, useContext, useEffect, useReducer } from 'react';
import { authAPI, endPoints } from '../../Configs/APIs';
import { statusCode } from '../../Configs/Constants';
import { getTokens, refreshAccessToken } from '../../Utils/Utilities';
import { SignInAction, SignOutAction } from '../Actions/AccountAction';
import { accountReducer } from '../Reducers/AccountReducer';

export const AccountContext = createContext(null);
export const AccountDispatchContext = createContext(null);

const initialState = {
   data: null,
   loading: true,
   isLoggedIn: false,
};

export const AccountProvider = ({ children }) => {
   const [account, dispatch] = useReducer(accountReducer, initialState);

   const checkLogged = async (retryCount = 0) => {
      const { accessToken, refreshToken } = await getTokens();

      if (!accessToken || !refreshToken) {
         dispatch(SignOutAction());
         return;
      }

      try {
         const response = await authAPI(accessToken).get(endPoints['me']);
         if (response.status === statusCode.HTTP_200_OK) {
            dispatch(SignInAction(response.data));
         }
      } catch (error) {
         if (error.response) {
            errorStatus = error.response.status;
            if (
               (errorStatus !== statusCode.HTTP_401_UNAUTHORIZED && errorStatus !== statusCode.HTTP_403_FORBIDDEN) ||
               retryCount > 3
            ) {
               dispatch(SignOutAction());
               return;
            }

            const newAccessToken = await refreshAccessToken(refreshToken, dispatch);
            if (newAccessToken) {
               checkLogged(retryCount + 1);
            }
         } else {
            console.error(error);
         }
      }
   };

   useEffect(() => {
      checkLogged(0);
   }, []);

   return (
      <AccountContext.Provider value={account}>
         <AccountDispatchContext.Provider value={dispatch}>{children}</AccountDispatchContext.Provider>
      </AccountContext.Provider>
   );
};

export const useAccount = () => {
   return useContext(AccountContext);
};

export const useAccountDispatch = () => {
   return useContext(AccountDispatchContext);
};
