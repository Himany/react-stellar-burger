import { getCookie, setCookie } from "./cookie";

const url = 'https://norma.nomoreparties.space/';

export const getIngredientsApi = () => {
  return(fetch(`${url}api/ingredients`));
};

export const getOrdeApi = (data) => {
  const accessToken = getCookie('accessToken');

  return(fetch(
    `${url}api/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    }
  ));
};

export const authApi = (data) => {
  return(fetch(
    `${url}api/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  ));
};

export const logoutApi = (data) => {
  return(fetch(
    `${url}api/auth/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  ));
};

export const registerApi = (data) => {
  return(fetch(
    `${url}api/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  ));
};

export const updateTokenApi = (data) => {
  return(fetch(
    `${url}api/auth/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  ));
};

export const getUserApi = () => {
  const accessToken = getCookie('accessToken');

  return(fetch(
    `${url}api/auth/user`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      }
    }
  ));
};

export const updateUserDataApi = (data) => {
  const accessToken = getCookie('accessToken');

  return(fetch(
    `${url}api/auth/user`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    }
  ));
};

export const fetchProfile = (query, data = null) => {
  const refreshToken = getCookie('refreshToken');
  const accessToken = getCookie('accessToken');

  if (refreshToken && !accessToken) {
    return(
      query(data)
      .then(res => res.json())
      .then(res => {
        if (res.message === 'jwt malformed') {
          return(updateTokenApi({token: refreshToken})
          .then(checkResponse)
          .then(res => {
            if (res && res.success) {
              const authToken = res.accessToken.split('Bearer ')[1];

              setCookie('accessToken', authToken, { expires: 60 * 20 });
              setCookie('refreshToken', res.refreshToken);
            }
          })
          .catch((res) => {
            throw new Error(res);
          }));
        }
      })
      .then(() => {
        return(query(data));
      })
      .catch((res) => {
        Promise.reject(res)
      })
    );
  } else {
    return(query(data));
  }
}

export const forgotPasswordApi = (data) => {
  return(fetch(
    `${url}api/password-reset`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  ));
};

export const resetPasswordApi = (data) => {
  return(fetch(
    `${url}api/password-reset/reset`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  ));
};

export const checkResponse = (res) => (res.ok ? res.json() : res.json().then((error) => Promise.reject(error)));

export const getOderDataApi = (number) => {
  return(fetch(
    `${url}api/orders/${number}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ));
};