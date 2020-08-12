import { UPDATE_FORM, UPDATE_VALIDATION, RESET_STATE  } from './types'
import {IReduxState} from './state';

interface IReduxPayload {
    key: string;
    value: string;
};

interface IReduxAction {
    type: string;
    payload: IReduxPayload;
};

const initialState: IReduxState = {
  username: '',
  password: '',
  password2: '',
  blocked: false,
  validation: {
    "correctLength": false,
    "hasInput": false,
    "hasRegular": false,
    "hasUppercase": false,
    "hasNumber": false,
    "isPassword2Correct": false
  },
  success: false
}

export function rootReducer(
  state = initialState,
  action: IReduxAction
): IReduxState {
  switch (action.type) {
    case UPDATE_FORM: {
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    }
    case UPDATE_VALIDATION: {
      return {
        ...state,
        "validation": {
          ...state.validation,
          [action.payload.key]: action.payload.value
        }
      }
    }
    case RESET_STATE:
      return initialState;
    default:
      return state
  }
}
