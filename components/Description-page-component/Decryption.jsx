import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import DescriptionForm from "./DecryptionForm";
import {cleanStateDescriptionThunkCreator, setStateDescriptionThunkCreator} from "../../redux/decryption-reducer";

const Decryption = React.memo((props) => {
    const [cipher, setCipher] = useState("myCipher");
    const [stateValue, setStateValue] = useState("");
    const [stateKey, setStateKey] = useState("");

    useEffect(() => {
        return () => props.cleanStateDescriptionThunkCreator();
    }, []);

    const selectCipher = (event) => {
        const newCipher = event.target.innerHTML;
        event.target.innerHTML = cipher;
        setCipher(newCipher);
    }

    const sendValueForEncryption = () => {
        if (stateKey !== "" && stateValue !== "") {
            const data = {value: stateValue, key: stateKey, cipher};
            props.setStateDescriptionThunkCreator(data);
        }
    }

    return (
        <div className="encryption-block">
            <DescriptionForm ciphers={props.ciphers} stateValue={stateValue} stateKey={stateKey}
                            setStateValue={setStateValue} setStateKey={setStateKey}
                            sendValueForEncryption={sendValueForEncryption} selectCipher={selectCipher} cipher={cipher}
                            result={props.result}/>
        </div>
    );
})

const mapStateToProps = (state) => {
    return {
        result: state.description.result
    };
}

export default connect(mapStateToProps, { setStateDescriptionThunkCreator, cleanStateDescriptionThunkCreator })(Decryption);
