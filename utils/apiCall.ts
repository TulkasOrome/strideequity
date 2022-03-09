import Global from './globalEvents';

const Api = {
  async call(path, method, data) {
    const res = await (method === 'GET' ? (
      fetch(`/api/${path}?${Object.keys(data).map(((k) => `${k}=${encodeURIComponent(data[k])}`)).join('&')}`)
    ) : (
      fetch(`/api/${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    ));
    if (res.status === 200) {
      const r = await res.json();
      console.log('result', path, r)
      return r
    }
    const error = await res.json();
    Global.notify({ type: 'error', msg: error.message });
    return error;
  },
  async get(path, data) {return Api.call(path, 'GET', data)},
  async post(path, data) {return Api.call(path, 'POST', data)},
  async put(path, data) {return Api.call(path, 'PUT', data)},
  async delete(path, data) {return Api.call(path, 'DELETE', data)},
};

export default Api;
