import { STORE_USER } from '../actions/index';

const user = (state = 0, action) => {
    switch(action.type) {
        case STORE_USER:
            return action.user;  
         default:
             return state;   
    }
}

export default user;
