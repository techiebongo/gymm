import {CREDIT, URL} from '../Action/type';

const initialState={
    credit :0,
    url: '',
};

export default function(state = initialState, action) {
  // console.log(state, action, 'Reducer =====>');
  switch (action.type) {
    case CREDIT:
      return {
        ...state,
        credit: action.payload
    };
    case URL:
        return{
            ...state,
            url:action.payload
        }
    default:
      return state;
  }
}