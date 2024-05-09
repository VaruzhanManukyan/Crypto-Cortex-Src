import React from "react";

export const Input = React.memo((props) => {
    const {input, meta: {touched, error}, placeholder} = props;
    const hasError = touched && error;
    return (
        <input
            {...input}
            onChange={event => props.onChangeValue(event)}
            placeholder={hasError || placeholder}
            className={"input-styles" + (hasError ? " error" : "")}
            value={props.value}
        />
    );
});

export const keyInput = React.memo((props) => {
    const {input, meta: {touched, error}, placeholder} = props;
    const hasError = touched && error;
    return (
        <input
            {...input}
            onChange={event => props.onChangeKey(event)}
            placeholder={hasError || placeholder}
            value={hasError === "The key must be a number" ? "" : props.value}
            className={"input-styles" + (hasError ? " error" : "")}
        />
    );
});

