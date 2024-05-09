import {alphabets} from "./alphabets";

export function* searchSymbolAndAlphabets (char) {
    const arrayAlphabets = Array.from(Object.values(alphabets));
    for (let i = 0; i < arrayAlphabets.length; i++) {
        if (arrayAlphabets[i].indexOf(char) !== -1) {
            yield arrayAlphabets[i].indexOf(char);
            yield arrayAlphabets[i];
        }
    }

    return -1;
}