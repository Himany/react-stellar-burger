const url = 'https://norma.nomoreparties.space/';

export const getIngredientsApi = () => {
  return(fetch(`${url}api/ingredients`));
};

export const getOrdeApi = (data) => {
  return(fetch(
    `${url}api/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  ));
};