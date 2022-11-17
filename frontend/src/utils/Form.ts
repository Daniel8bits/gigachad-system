const Form = (form: HTMLFormElement): Record<string, FormDataEntryValue> => {
    const formData = new FormData(form);
    const object: Record<string, FormDataEntryValue> = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    return object;
}

export default Form;