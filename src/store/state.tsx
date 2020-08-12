export interface IValidation {
    correctLength: boolean;
    hasInput: boolean;
    hasRegular: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    isPassword2Correct: boolean;
};

export interface IReduxState {
    username: string;
    password: string;
    password2: string;
    blocked: boolean;
    validation: IValidation;
    success: boolean;
};