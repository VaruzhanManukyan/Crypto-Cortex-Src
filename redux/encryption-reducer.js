import {caesarCipher} from "../utils/caesarCipher";
import {searchSymbolAndAlphabets} from "../utils/searchSymbolAndAlphabets";

const CryptoJS = require("crypto-js");

const ENCRYPTION_DATA = "ENCRYPT_DATA";
const ENCRYPTION_DATA_CLEAN = "ENCRYPTION_DATA_CLEAN";

const initialState = {
    value: "",
    key: "",
    cipher: "",
    result: ""
};

function encryptionReducer(state = initialState, action) {
    switch (action.type) {
        case ENCRYPTION_DATA:
            return {
                ...action.payload
            };
        case ENCRYPTION_DATA_CLEAN:
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

const encryptionDataActionCreator = (state) => ({type: ENCRYPTION_DATA, payload: state});
const encryptionDataCleanActionCreator = () => ({type: ENCRYPTION_DATA_CLEAN});
export const setStateEncryptionThunkCreator = (newState) => (dispatch) => {
    switch (newState.cipher) {
        case "myCipher":
            newState.result = myCipher(newState.value, newState.key);
            break;
        case "Caesar":
            newState.result = caesarCipher(newState.value, +newState.key);
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
    dispatch(encryptionDataActionCreator(newState));
}

export const cleanStateEncryptionThunkCreator = () => (dispatch) => dispatch(encryptionDataCleanActionCreator());

function myCipher(text, key) {
    try {
        let keyForCaesar = 0;
        for (let i = 0; i < key.length; i++) {
            keyForCaesar += key.charCodeAt(i);
        }

        const caesarCipherResult = caesarCipher(text, keyForCaesar);
        const vigenereCipherResult = vigenereCipher(caesarCipherResult, key);
        const tripleDESCipherResult = tripleDESCipher(vigenereCipherResult, key).toString();
        const rabbitCipherResult = rabbitCipher(tripleDESCipherResult, key).toString();
        const RC4DropCipherResult = RC4DropCipher(rabbitCipherResult, key).toString();
        return AESCipher(RC4DropCipherResult, key).toString();
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function DESCipher(text, key) {
    try {
        return CryptoJS.DES.encrypt(text, key);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function tripleDESCipher(text, key) {
    try {
        return CryptoJS.TripleDES.encrypt(text, key);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function rabbitCipher(text, key) {
    try {
        return CryptoJS.Rabbit.encrypt(text, key);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function RC4Cipher(text, key) {
    try {
        return CryptoJS.RC4.encrypt(text, key);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function RC4DropCipher(text, key) {
    try {
        return CryptoJS.RC4Drop.encrypt(text, key);
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

function AESCipher(text, key) {
    try {
        return CryptoJS.AES.encrypt(text, key);
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
            newText += matrixAlphabet[+codeKey.value][+codeValue.value];
        }
        return newText;
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}

export default encryptionReducer;
