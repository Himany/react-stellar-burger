const url = 'https://norma.nomoreparties.space/';

export const getIngredients = (setState) => {
  fetch(`${url}api/ingredients`)
    .then(res => res.ok ? res.json() : res.json().then((error) => Promise.reject(error)))
    .then(res => setState({ data: res.data }))
    .catch(e => console.log("Error loading data..."));
};