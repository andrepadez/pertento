import { useGlobal } from './useGlobal';

export const createClient = (baseUrl = import.meta.env.VITE_API_URL) => {
  return {
    baseUrl,
    get: (url) => get(url, baseUrl),
    getStream: (url) => getStream(url, baseUrl),
    post: (url, payload) => post(url, payload, baseUrl),
    put: (url, payload) => put(url, payload, baseUrl),
    patch: (url, payload) => patch(url, payload, baseUrl),
    delete: (url, payload) => DELETE(url, payload, baseUrl),
  };
};

export const useClient = (baseUrl = import.meta.env.VITE_API_URL) => {
  const [apiError, setApiError] = useGlobal('API_ERROR', null);
  useClient.config.onError = setApiError;

  const client = createClient(baseUrl);
  return { ...client, apiError, setApiError };
};

useClient.config = {};

export const getHeaders = () => {
  const token =
    window.pertentoBearerToken ||
    document.body.dataset.pertentoBearerToken ||
    new URL(window.location.href).searchParams.get('pertentoToken') ||
    localStorage.getItem('PERTENTO_EDITOR_AUTH_TOKEN') ||
    localStorage.getItem('BEARER_TOKEN') ||
    sessionStorage.getItem('BEARER_TOKEN');

  return {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const get = async (uri, baseUrl = '') => {
  const headers = getHeaders();
  const theUrl = baseUrl ? `${baseUrl}/${uri.replace(/^\//, '')}` : uri;
  const res = await fetch(theUrl, { headers });
  await validateResponse(res);
  const data = await res.json();
  return data;
};

export const getStream = (uri, baseUrl = '') => {
  const headers = getHeaders();
  const theUrl = baseUrl ? `${baseUrl}/${uri.replace(/^\//, '')}` : uri;
  const stream = new EventSource(theUrl, { headers });
  return stream;
};

export const post = async (uri, payload, baseUrl = '') => {
  const headers = getHeaders();
  const theUrl = baseUrl ? `${baseUrl}/${uri.replace(/^\//, '')}` : uri;
  const res = await fetch(theUrl, {
    timeout: 200000,
    method: 'post',
    body: JSON.stringify(payload),
    headers,
  });
  await validateResponse(res);
  return res.json();
};

export const put = async (uri, payload, baseUrl = '') => {
  const headers = getHeaders();
  const theUrl = baseUrl ? `${baseUrl}/${uri.replace(/^\//, '')}` : uri;
  const res = await fetch(theUrl, {
    timeout: 200000,
    method: 'put',
    body: JSON.stringify(payload),
    headers,
  });
  await validateResponse(res);
  return res.json();
};

export const patch = async (uri, payload, baseUrl = '') => {
  const headers = getHeaders();
  const theUrl = baseUrl ? `${baseUrl}/${uri.replace(/^\//, '')}` : uri;
  const res = await fetch(theUrl, {
    timeout: 200000,
    method: 'patch',
    body: JSON.stringify(payload),
    headers,
  });
  await validateResponse(res);
  return res.json();
};

export const DELETE = async (uri, payload, baseUrl = '') => {
  const headers = getHeaders();
  const theUrl = baseUrl ? `${baseUrl}/${uri.replace(/^\//, '')}` : uri;
  const res = await fetch(theUrl, {
    method: 'delete',
    body: JSON.stringify(payload),
    headers,
  });
  await validateResponse(res);
  return res.json();
};

const validateResponse = async (res) => {
  if (res.status >= 400) {
    const { onError } = useClient.config;
    const message = await res.text();
    if (onError) {
      onError({ status: res.status, message });
    }
    throw { status: res.status, message };
  }
};
