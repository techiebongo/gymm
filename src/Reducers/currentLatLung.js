import {CURRENT_LAT, CURRENT_LUNG} from '../Action/type';

const initialState={
    lat :0,
    lung: 0,
};

export default function(state = initialState, action) {
//   console.log(state, action, 'Reducer =====>');
  switch (action.type) {
    case CURRENT_LAT:
      return {
        ...state,
        lat: action.payload
    };
    case CURRENT_LUNG:
        return{
            ...state,
            lung:action.payload
        }
    default:
      return state;
  }
}