import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import EncryptionForm from "./EncryptionForm";
import {cleanStateEncryptionThunkCreator, setStateEncryptionThunkCreator} from "../../redux/encryption-reducer";

const Encryption = React.memo((props) => {
    const [cipher, setCipher] = useState("myCipher");
    const [stateValue, setStateValue] = useState("");
    const [stateKey, setStateKey] = useState("");

    useEffect(() => {
        return () => props.cleanStateEncryptionThunkCreator();
    }, []);

    const selectCipher = (event) => {
        const newCipher = event.target.innerHTML;
        event.target.innerHTML = cipher;
        setCipher(newCipher);
    }

    const sendValueForEncryption = () => {
        if (stateKey !== "" && stateValue !== "") {
            const data = {value: stateValue, key: stateKey, cipher};
            props.setStateEncryptionThunkCreator(data);
        }
    }

    return (
        <div className="encryption-block">
            <EncryptionForm ciphers={props.ciphers} stateValue={stateValue} stateKey={stateKey}
                            setStateValue={setStateValue} setStateKey={setStateKey}
                            sendValueForEncryption={sendValueForEncryption} selectCipher={selectCipher} cipher={cipher}
                            result={props.result}/>
        </div>
    );
});

const mapStateToProps = (state) => {
    return {
        result: state.encryption.result
    };
};

export default connect(mapStateToProps, {setStateEncryptionThunkCreator, cleanStateEncryptionThunkCreator})(Encryption);