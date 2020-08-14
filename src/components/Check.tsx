import * as React from 'react';
import classnames from 'classnames';

interface ICheckProps {
    correctLength: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    isPassword2Correct: boolean;
    hasRegular: boolean;
};

const Check: React.FC<{ validation: ICheckProps }> = ({validation}) => {
    return <div className="row">
    <div className="col">
    <p className={classnames({"text-danger": !validation.hasRegular, "text-success": validation.hasRegular})}> Regular letter </p>
        <p className={classnames({"text-danger": !validation.hasUppercase, "text-success": validation.hasUppercase})}>Capital letter </p>
    </div>

    <div className="col">
        <p className={classnames({"text-danger": !validation.hasNumber, "text-success": validation.hasNumber})}>Number </p>
    <p className={classnames({"text-danger": !validation.correctLength, "text-success": validation.correctLength})}>At least 6 </p>
    </div>
    </div>
}

export default Check;