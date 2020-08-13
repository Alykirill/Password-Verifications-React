import * as React from 'react';
import {hasLowercase, isNumber, checkLength, hasUppercase} from "../validations/validation";
import Check from './Check';
import {Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {setField, setValidationField, resetState} from '../store/actions';
import {IReduxState, IValidation} from '../store/state';
import {sendData} from '../services/Api';
import './form.css'

const FormComponent: React.FC = () => {
    const username: string = useSelector<IReduxState, string>((state) => state.username);
    const password: string = useSelector<IReduxState, string>((state) => state.password);
    const password2: string = useSelector<IReduxState, string>((state) => state.password2);
    const blocked: boolean = useSelector<IReduxState, boolean>((state) => state.blocked);
    const validation: IValidation = useSelector<IReduxState, IValidation>((state) => state.validation);
    const success: boolean = useSelector<IReduxState, boolean>((state) => state.success);

    const dispatch = useDispatch();

    const sendRequest = async (username: string, password: string, password2: string): Promise<void> => {
        try {
            dispatch(setField<boolean>("blocked", true));
            const json = await sendData(username, password);
            dispatch(setField<boolean>("success", !json.error));
            console.log(json);
            dispatch(resetState());
            dispatch(setField<boolean>("success", true));
        } catch (error) {
            console.log(error);
            dispatch(setField<boolean>("blocked", false));
            dispatch(setField<boolean>("success", false));
        }
    }

    const validate = async (e: React.FormEvent<HTMLInputElement> | undefined): Promise<void> => {

        dispatch(setValidationField("correctLength", true));
        dispatch(setValidationField("hasInput", true));
        dispatch(setValidationField("hasRegular", true));
        dispatch(setValidationField("hasUppercase", true));
        dispatch(setValidationField("hasNumber", true));
        dispatch(setValidationField("isPassword2Correct", true));


        if (!hasLowercase(password)) dispatch(setValidationField("hasRegular", false));
        if (!hasUppercase(password)) dispatch(setValidationField("hasUppercase", false));
        if (!isNumber(password)) dispatch(setValidationField("hasNumber", false));
        if (!checkLength(password)) dispatch(setValidationField("correctLength", false));
        if (password !== password2 || password === "") dispatch(setValidationField("isPassword2Correct", false));
        dispatch(setField("blocked", !(hasLowercase(password) && hasUppercase(password) && isNumber(password) && checkLength(password) && (password == password2) && password !== "")));

    }

    const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        dispatch(setField<boolean>("success", false));
        try {
            await validate(undefined);
            if (validation.correctLength && validation.hasInput && validation.hasRegular && validation.hasUppercase && validation.hasNumber && validation.isPassword2Correct) {
                await sendRequest(username, password, password2);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const change = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        dispatch(setField<string>(e.target.name, e.target.value));
        validate(undefined);
    }

    React.useEffect(() => {
        validate(undefined);
    }, []);

    return (<Form className="form" onSubmit={submit}>
        {
            success && (
                <Alert color="success">
                    Success
                </Alert>
            )
        }

        {
            (!validation.isPassword2Correct && password.length > 0 && password2.length > 0) ? (
                <Alert color="danger">
                    Invalid verification
                </Alert>
            ) : null}
        <FormGroup row>
            <Label for="username" sm={2}>Username: </Label>
            <Col sm={10}>
                <Input type="text" name="username" id="username" value={username} onChange={change}
                       onBlur={validate}/>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="password" sm={2}>Enter Password: </Label>
            <Col sm={10}>
                <Input type="password" name="password" id="password" value={password} onChange={change}
                       onBlur={validate}/>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="password" sm={2}>Re-Enter Password: </Label>
            <Col sm={10}>
                <Input type="password" name="password2" id="password2" value={password2}
                       onChange={change} onBlur={validate}/>
            </Col>
        </FormGroup>
        <Check validation={validation}/>
        <Button color="primary" type="submit" disabled={blocked}>Submit</Button>
    </Form>)
}

export default FormComponent;