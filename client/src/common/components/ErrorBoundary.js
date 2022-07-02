import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.state = { error: false };
        //const history = useHistory();
    }

    

    static getDerivedStateFromError(error) {
        // Devolvemos el objeto para actualizar el estado
        return { error: true };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    click() {
        this.setState({ error: false });
    }

    render() {
        if (this.state.error) {
            return (
                <Fragment>
                    <h1>Ops! Algo ha salido mal</h1>
                    
                </Fragment>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;