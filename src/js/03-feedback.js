import throttle from "lodash.throttle";

///Задаємо назву ключа для сховища (одразу в трьох місцяї)
const STORAGE_KEY = "feedback-form-state";

////об'єкт для зберігання data в Local storage
const formData = {};

////посилання в документ
const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
}

////вивід збережених даних
populateFormInput();

////прослуховування
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput,500));


/////Функції
function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
       formData[e.target.name] = e.target.value;
       const formDataString = JSON.stringify(formData);

       localStorage.setItem(STORAGE_KEY, formDataString);
}
    
function populateFormInput() {
    const savedFormData = localStorage.getItem(STORAGE_KEY);
    const parsedSavedFormData = JSON.parse(savedFormData);

    if (parsedSavedFormData) {

        if (parsedSavedFormData.email) {
            refs.input.value = parsedSavedFormData.email;
        }

        if (parsedSavedFormData.message) {
            refs.textarea.value = parsedSavedFormData.message;
        }
    }
    
    }