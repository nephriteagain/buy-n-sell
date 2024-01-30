export const formData = {
    disabled:true,
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    password:'',
    confirmPassword: '',
    validPassword: false
}

export enum ActionKind {
    FIRSTNAME_CHANGE,
    LASTNAME_CHANGE,
    EMAIL_CHANGE,
    BIRTHDATE_CHANGE,
    PASSWORD_CHANGE,
    CONFIRMPASS_CHANGE,
    DISABLE_CHANGE,
    VALIDATE_PASSWORD
}

type InputAction = {
    type: Exclude<ActionKind, ActionKind.DISABLE_CHANGE|ActionKind.VALIDATE_PASSWORD>;
    payload: string;
}

type ButtonStateAction = {
    type: ActionKind.DISABLE_CHANGE;
    payload: boolean;
}

type ValidPasswordAction = {
    type: ActionKind.VALIDATE_PASSWORD;
    payload: boolean;
}

export type Action = InputAction|ButtonStateAction|ValidPasswordAction

type FormSignupData = typeof formData


export function formReducer(state: FormSignupData, action: Action) : FormSignupData {
    switch (action.type) {
        case ActionKind.FIRSTNAME_CHANGE :
            return {
                ...state,
                firstName: action.payload
            };
        case ActionKind.LASTNAME_CHANGE :
            return {
                ...state,
                lastName: action.payload
            };
        case ActionKind.EMAIL_CHANGE :
            return {
                ...state,
                email: action.payload
            };
        case ActionKind.BIRTHDATE_CHANGE : 
            return {
                ...state,
                birthDate: action.payload
            };
        case ActionKind.PASSWORD_CHANGE :
            return {
                ...state,
                password: action.payload
            };
        case ActionKind.CONFIRMPASS_CHANGE :
            return {
                ...state,
                confirmPassword: action.payload
            };
        case ActionKind.DISABLE_CHANGE :
            return {
                ...state,
                disabled: action.payload
            };
        case ActionKind.VALIDATE_PASSWORD :
            return {
                ...state,
                validPassword: action.payload
            };
        default:
            return {
                ...state
            }
    }

}

