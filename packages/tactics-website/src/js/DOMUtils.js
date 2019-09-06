export const $ = (selector, scope = document) => scope.querySelector(selector);

export const $$ = (selector, scope = document) => [
    ...scope.querySelectorAll(selector)
];

export const getFormValues = formElement => {
    const formData = new FormData(formElement);
    let values = {};
    for (let [key, value] of formData.entries()) {
        values[key] = value;
    }

    return values;
};
