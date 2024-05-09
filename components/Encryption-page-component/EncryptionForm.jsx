import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";

import { cesarKeyIsNumber, required } from "../../utils/validators";
import { Input, keyInput } from "../../common/FormControls/FormControls";

import copyIcon from "../../assets/images/copy-icon.webp";
import copyIconHover from "../../assets/images/copy-icon-hover.webp";
import copyIconResolved from "../../assets/images/icon-copy-resolved.webp";
import copyIconHoverResolved from "../../assets/images/icon-copy-resolved-hover.webp";

const IconCopy = () => {
    return (
        <>
            <img src={copyIcon} className={"img-icon-copy-first"} />
            <img src={copyIconHover} className={"img-icon-copy-last"} />
        </>
    );
}

const IconCopyResolved = () => {
    return (
        <>
            <img src={copyIconResolved} className={"img-icon-copy-first-resolved"} />
            <img src={copyIconHoverResolved} className={"img-icon-copy-last-resolved"} />
        </>
    );
}

const EncryptionForm = React.memo(({ setStateValue, setStateKey, stateValue, stateKey, cipher, selectCipher, sendValueForEncryption, result }) => {
    let validatorForCesar = cesarKeyIsNumber(cipher, stateKey, setStateKey);
    const [stateIcon, setStateIcon] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setStateIcon(true)
    }, [result]);

    const unsecuredCopyToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus(); textArea.select();
        try {
            document.execCommand('copy')
        } catch (err) {
            console.error('Unable to copy to clipboard', err)
        }
        document.body.removeChild(textArea)
    }


    const copyToClipboard = (content) => {
        if (!result) return;
        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(content)
                .then(() => {
                    setStateIcon(false);
                })
                .catch((error) => {
                    console.error('Error copying text to clipboard:', error);
                });
        } else {
            unsecuredCopyToClipboard(content);
            setStateIcon(false);
        }
    }

    return (
        <form className="encryption-block-main">
            <h1 className="title-styles">Encryption</h1>
            <h2 className="input-subTitle-styles">Value *</h2>
            <Field component={Input} placeholder="value" onChangeValue={event => setStateValue(event.target.value)} value={stateValue} name="value" validate={[required]} />
            <h2 className="input-subTitle-styles">Key *</h2>
            <Field component={keyInput} placeholder="key" cipher={cipher} setStateKey={setStateKey} onChangeKey={event => setStateKey(event.target.value)} value={stateKey} name="key" validate={[validatorForCesar]} />
            <div className="style-btn-box">
                <div style={{ cursor: "pointer" }} onClick={sendValueForEncryption} className="btn-box-styles">
                    <a style={{ textDecoration: "none" }} className="btn1-styles">Encrypt</a>
                </div>
                <div className="dropdown">
                    <div className="dropbtn">{cipher}</div>
                    <div className="dropdown-content">
                        <a onClick={selectCipher}>Caesar</a>
                        <a onClick={selectCipher}>Vigenere</a>
                        <a onClick={selectCipher}>DES</a>
                        <a onClick={selectCipher}>Triple DES</a>
                        <a onClick={selectCipher}>Rabbit</a>
                        <a onClick={selectCipher}>RC4</a>
                        <a onClick={selectCipher}>RC4Drop</a>
                        <a onClick={selectCipher}>AES</a>
                    </div>
                </div>
            </div>
            <div className="block-title-result">
                <h2 className="input-subTitle-styles">Result</h2>
                <div className="wrapper">
                    <div onClick={() => copyToClipboard(result)} className="block-icon">
                        {stateIcon ? <IconCopy /> : <IconCopyResolved/>}
                        <p className="input-subTitle-result-styles">Copy</p>
                    </div>
                </div>
            </div>
            <textarea value={result} className="input-styles" name="result" />
        </form>
    );
});

export default reduxForm({ form: "encryptionForm" })(EncryptionForm);