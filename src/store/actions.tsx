import { UPDATE_FORM, UPDATE_VALIDATION, RESET_STATE } from './types';

export function setField<T>(field: string, value: T) {
    return {
        type: UPDATE_FORM,
        payload: {
            key: field,
            value: value
        }
    }
}

export function setValidationField(field: string, value: boolean) {
    return {
        type: UPDATE_VALIDATION,
        payload: {
            key: field,
            value: value
        }
    }
}

export function resetState() {
    return {type: RESET_STATE}
}