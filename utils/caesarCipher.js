import {searchSymbolAndAlphabets} from "./searchSymbolAndAlphabets";

export function caesarCipher(text, shift) {
    try {
        let newText = "";
        for (let i = 0; i < text.length; i++) {
            const getCodeAndAlphabet = searchSymbolAndAlphabets(text[i]);
            let code = getCodeAndAlphabet.next();
            if (code.value === -1) {
                newText += text[i];
                continue;
            }
            let alphabet = getCodeAndAlphabet.next();
            let resultCode = code.value + shift;
            if (resultCode >= alphabet.value.length || resultCode <= -alphabet.value.length)
                resultCode = resultCode % alphabet.value.length;
            if (resultCode < 0)
                resultCode = alphabet.value.length + resultCode;

            newText += alphabet.value[resultCode];
        }
        return newText;
    } catch (error) {
        return "This text cannot be decrypted Change the password or cipher";
    }
}
