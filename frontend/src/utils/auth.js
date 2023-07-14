const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(console.log(`Произошла ошибка, ${res.status}`))
  };
}

const BASE_URL = 'https://api.egmas.nomoredomains.work';

const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse)
    .then((userData) => {
      if (userData.token) { localStorage.setItem('token', userData.token)}
    })
}

const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  }).then(checkResponse);
}

export { register, authorize, checkToken };