const url = 'https://norma.nomoreparties.space/';

export const getIngredients = (state, setState) => {
  fetch(`${url}api/ingredients`)
    .then(res => res.ok ? res.json() : res.json().then((error) => Promise.reject(error)))
    .then(res => setState({ type: 'setData', payload: res.data}))
    .catch(e => console.log("Error loading data..."));
};

export const getOrderId = (data, setState) => {
  setState({ type: 'setOrderError', payload: false});
  setState({ type: 'setOrderLoading', payload: true});
  fetch(
    `${url}api/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )
    .then(res => res.ok ? res.json() : res.json().then((error) => Promise.reject(error)))
    .then(res => {
      setState({ type: 'setOrderData', payload: res});
      setState({ type: 'setOrderLoading', payload: false});
    })
    .catch(e => {
      setState({ type: 'setOrderError', payload: true});
      setState({ type: 'setOrderLoading', payload: false});
      console.log("Error loading data...");
    });
};