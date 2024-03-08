export const isOkStatus = status => status >= 200 && status < 300;

export const handleResponse = async (res, handlers = {}) => {
  const { status, statusText } = res;
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.error(
      [
        'Failed to parse response text as JSON.',
        `Error: ${e.message}`,
        `Text: ${JSON.stringify(text)}`,
      ].join(' ')
    );
  }

  const ret = {
    status,
    statusText,
    text,
    json,
  };

  if (handlers.onData) {
    handlers.onData(json);
  }
  if (status === 401 && handlers.on401) {
    handlers.on401(ret);
  }
  if (status === 403 && handlers.on403) {
    handlers.on403(ret);
  }
  if (status === 404 && handlers.on404) {
    handlers.on404(ret);
  }
  if (status < 200 && handlers.on1xx) {
    handlers.on1xx(ret);
  } else if (isOkStatus(status) && handlers.on2xx) {
    handlers.on2xx(ret);
  } else if (status >= 300 && status < 400 && handlers.on3xx) {
    handlers.on3xx(ret);
  } else if (status >= 400 && status < 500 && handlers.on4xx) {
    handlers.on4xx(ret);
  } else if (status >= 500 && handlers.on5xx) {
    handlers.on5xx(ret);
  }

  return ret;
};
