import { ADD_TALKS, REMOVE_TALK} from '../actions/index';

const schedule = (state = [], action) => {
    switch(action.type) {
        case ADD_TALKS:
            return action.talks;
        case REMOVE_TALK:
            return (state.filter(x => x.id !== action.id));    
         default:
             returhn state;   
    }
}

export default schedule;
