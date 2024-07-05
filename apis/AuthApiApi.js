import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import { handleResponse, isOkStatus } from '../utils/handleRestApiResponse';
import usePrevious from '../utils/usePrevious';
import {
  encodeQueryParam,
  renderParam,
  renderQueryString,
} from '../utils/encodeQueryParam';
import * as GlobalVariables from '../config/GlobalVariableContext';

const cleanHeaders = headers =>
  Object.fromEntries(Object.entries(headers).filter(kv => kv[1] != null));

export const authMeGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/auth/me`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useAuthMeGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['authApiAuthMeGET', args],
    () => authMeGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['authApiAuthMeGETS']),
    }
  );
};

export const FetchAuthMeGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useAuthMeGET({}, { refetchInterval, handlers: { onData, ...handlers } });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchAuthMe: refetch });
};

export const loginPOST = async (Constants, { code, phone }, handlers = {}) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/auth/login`;
  const options = {
    body: JSON.stringify({ phone: phone, code: code }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useLoginPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['authApiLoginPOST', args],
    () => loginPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['authApiLoginPOSTS']),
    }
  );
};

export const FetchLoginPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  code,
  phone,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useLoginPOST(
    { code, phone },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchLogin: refetch });
};

export const resendPOST = async (Constants, { phone }, handlers = {}) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/auth/resend_code`;
  const options = {
    body: JSON.stringify({ phone: phone }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useResendPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['authApiResendPOST', args],
    () => resendPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['authApiResendPOSTS']),
    }
  );
};

export const FetchResendPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  phone,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useResendPOST(
    { phone },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchResend: refetch });
};

export const signupPOST = async (
  Constants,
  { dob, first_name, last_name, phone },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/auth/signup`;
  const options = {
    body: JSON.stringify({
      phone: phone,
      first_name: first_name,
      last_name: last_name,
      dob: dob,
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useSignupPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['authApiSignupPOST', args],
    () => signupPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['authApiSignupPOSTS']),
    }
  );
};

export const FetchSignupPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  dob,
  first_name,
  last_name,
  phone,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useSignupPOST(
    { dob, first_name, last_name, phone },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchSignup: refetch });
};
