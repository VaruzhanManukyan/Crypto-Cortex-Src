export const required = value => {
    return "Field id required";
}

export const cesarKeyIsNumber = (cipher, valueKey, setValueKey) => value => {
    if (cipher === "Caesar" && (Number.isNaN(+valueKey) || valueKey === "")){
        setValueKey("");
        return "The key must be a number";
    }
    if(valueKey === "")
        return "Field id required";
}