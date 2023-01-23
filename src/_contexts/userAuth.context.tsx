import { createContext, Dispatch } from "react";
import { IAction, LOGIN, LOGOUT, User } from "../_models/types";
import jwt_decode from "jwt-decode";
const initialUserAuthState: User = null

const UserAuthReducer = (state: User, action: IAction) => {
    switch (action.type) {
        case LOGIN:
            if (!action.payload) return null;
            const token = action.payload.access;
            const user_id = (jwt_decode(token) as any).user_id;
            return { token, user_id };
        case LOGOUT:
            localStorage.removeItem('_artw');
            return null;
        default:
            throw new Error("Action not recognised!");
    }
}

export const UserAuthStateContext = createContext({
    UserAuthState: initialUserAuthState as User,
    dispatchUserAuth: {} as Dispatch<IAction>,
});

const UserAuthStateProvider = UserAuthStateContext.Provider;
export default UserAuthStateContext;
export { UserAuthStateProvider, UserAuthReducer, initialUserAuthState };
