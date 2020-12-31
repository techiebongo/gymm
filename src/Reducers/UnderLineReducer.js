import {
  HOME,
  HOWITWORK,
  PRICING,
  FINDAGYM,
  GYMLOCATION,
  GYMOWNER,
  BLOG,
  CLOSEUNDERLINE,
  SCROLLVIEW,
  SCROLLCOUNT,
} from "../Action/type";

const initialState = {
  home: 1,
  howIt: 0,
  pricing: 0,
  findAGym: 0,
  gymLocation: 0,
  gymOwner: 0,
  blog: 0,
  scrollView: 0,
  scrollCount: 0,
};

export default function (state = initialState, action) {
  // console.log(state, action, "Reducer =====>");
  switch (action.type) {
    case HOME:
      return {
        ...state,
        home: 1,
        howIt: 0,
        pricing: 0,
        findAGym: 0,
        gymLocation: 0,
        gymOwner: 0,
        blog: 0,
      };
    case HOWITWORK:
      return {
        ...state,
        home: 0,
        howIt: 1,
        pricing: 0,
        findAGym: 0,
        gymLocation: 0,
        gymOwner: 0,
        blog: 0,
      };
    case PRICING:
      return {
        ...state,
        home: 0,
        howIt: 0,
        pricing: 1,
        findAGym: 0,
        gymLocation: 0,
        gymOwner: 0,
        blog: 0,
      };
      case FINDAGYM:
      return {
        ...state,
        home: 0,
        howIt: 0,
        pricing: 0,
        findAGym: 1,
        gymLocation: 0,
        gymOwner: 0,
        blog: 0,
      };
    case GYMLOCATION:
      return {
        ...state,
        home: 0,
        howIt: 0,
        pricing: 0,
        findAGym: 0,
        gymLocation: 1,
        gymOwner: 0,
        blog: 0,
      };
      case GYMOWNER:
      return {
        ...state,
        home: 0,
        howIt: 0,
        pricing: 0,
        findAGym: 0,
        gymLocation: 0,
        gymOwner: 1,
        blog: 0,
      };
      case BLOG:
      return {
        ...state,
        home: 0,
        howIt: 0,
        pricing: 0,
        findAGym: 0,
        gymLocation: 0,
        gymOwner: 0,
        blog: 1,
      };
      case SCROLLVIEW:
      return {
        ...state,
        scrollView: action.payload
      };
    
      case CLOSEUNDERLINE:
      return {
        ...state,
        home: 0,
        howIt: 0,
        pricing: 0,
        findAGym: 0,
        gymLocation: 0,
        gymOwner: 0,
        blog: 0,
      };
      case SCROLLCOUNT:
        return{
          ...state,
          scrollCount: action.payload,
        }
    default:
      return state;
  }
}
