import {caesarCipher} from "../utils/caesarCipher";
import {searchSymbolAndAlphabets} from "../utils/searchSymbolAndAlphabets";

const CryptoJS = require("crypto-js");

const DESCRIPTION_DATA = "DESCRIPTION_DATA";
const DESCRIPTION_DATA_CLEAN = "DESCRIPTION_DATA_CLEAN";

const initialState = {
    value: "",
    key: "",
    cipher: "",
    result: ""
};

function decryptionReducer(state = initialState, action) {
    switch (action.type) {
        case DESCRIPTION_DATA:
            return {
                ...action.payload
            };
        case DESCRIPTION_DATA_CLEAN:
            return {
                value: "",
                key: "",
                cipher: "",
                result: ""
            };
        default:
            return state;
    }
}

const descriptionDataActionCreator = (state) => ({type: DESCRIPTION_DATA, payload: state});
const descriptionDataCleanActionCreator = () => ({type: DESCRIPTION_DATA_CLEAN});

export const setStateDescriptionThunkCreator = (newState) => (dispatch) => {
    switch (newState.cipher) {
        case "myCipher":
            newState.result = myCipher(newState.value, newState.key);
            break;
        case "Caesar":
            newState.result = caesarCipher(newState.value, -newState.key);
            break;
        case "Vigenere":
            newState.result = vigenereCipher(newState.value, newState.key);
            break;
        case "DES":
            newState.result = DESCipher(newState.value, newState.key);
            break;
        case "Triple DES":
            newState.result = tripleDESCipher(newState.value, newState.key);
            break;
        case "Rabbit":
            newState.result = rabbitCipher(newState.value, newState.key);
            break;
        case "RC4":
            newState.result = RC4Cipher(newState.value, newState.key);
            break;
        case "RC4Drop":
            newState.result = RC4DropCipher(newState.value, newState.key);
            break;
        case "AES":
            newState.result = AESCipher(newState.value, newState.key);
            break;
    }
    dispatch(descriptionDataActionCreator(newState));
}

export const cleanStateDescriptionThunkCreator = () => (dispatch) => {
    dispatch(descriptionDataCleanActionCreator());
}

function myCipher(text, key) {
    try {
        let keyForCaesar = 0;
        for (let i = 0; i < key.length; i++) {
            keyForCaesar += key.charCodeAt(i);
        }

        const AESCipherResult = AESCipher(text, key);
        const RC4DropCipherResult = RC4DropCipher(AESCipherResult, key);
        const rabbitCipherResult = rabbitCipher(RC4DropCipherResult, key);
        const tripleDESCipherResult = tripleDESCipher(rabbitCipherResult, key);
        const vigenereCipherResult = vigenereCipher(tripleDESCipherResult, key);
        return caesarCipher(vigenereCipherResult, -keyForCaesar);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function DESCipher(text, key) {
    try {
        return CryptoJS.DES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function tripleDESCipher(text, key) {
    try {
        return CryptoJS.TripleDES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function rabbitCipher(text, key) {
    try {
        return CryptoJS.Rabbit.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function RC4Cipher(text, key) {
    try {
        return CryptoJS.RC4.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function RC4DropCipher(text, key) {
    try {
        return CryptoJS.RC4Drop.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function AESCipher(text, key) {
    try {
        return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function vigenereCipher(text, key) {
    try {
        let newKey = "";
        let j = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i] === " ") {
                newKey += " ";
                continue;
            }
            newKey += key[j];
            j++;
            if (j === key.length) j = 0;
        }

        let newText = "";
        for (let i = 0; i < text.length; i++) {
            if (text[i] === " ") {
                newText += " ";
                continue;
            }
            const getTextAlphabet = searchSymbolAndAlphabets(text[i]);
            const codeValue = getTextAlphabet.next();
            const alphabetValue = getTextAlphabet.next();
            const getKeyAlphabet = searchSymbolAndAlphabets(newKey[i]);
            const codeKey = getKeyAlphabet.next();
            const alphabetKey = getKeyAlphabet.next();

            if (codeValue.value === -1 || codeKey.value === -1) {
                newText += text[i];
                continue;
            }
            let longAlphabet = "";
            while (+alphabetValue.value.length + +alphabetKey.value.length > longAlphabet.length) {
                longAlphabet += alphabetValue.value;
            }
            const matrixAlphabet = [];
            for (let i = 0; i < alphabetKey.value.length; i++) {
                matrixAlphabet[i] = [];

                for (let j = 0; j < alphabetValue.value.length; j++) {
                    matrixAlphabet[i][j] = longAlphabet[j + i];
                }
            }
            const indexNewChar = matrixAlphabet[+codeKey.value].indexOf(text[i]);
            newText += alphabetValue.value[indexNewChar];
        }
        return newText;
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

export default decryptionReducer;