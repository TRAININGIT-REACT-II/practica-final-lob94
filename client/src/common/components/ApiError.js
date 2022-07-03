import { Fragment } from "react";
import "../css/CommonCSS.css";

const ApiError = (props) => {

    const {apiError, error} = props;

    return ( 
        <Fragment>
            {apiError ? 
                <div className="apiErrorClass">
                    <span className="apiErrorMessage">{error}</span>
                </div>
                :
                <Fragment/>
            }
        </Fragment>

    );

}

export default ApiError;