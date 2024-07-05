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

export const addNewContactPOST = async (
  Constants,
  { name, phone_number },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/contact`;
  const options = {
    body: JSON.stringify({ name: name, phone_number: phone_number }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useAddNewContactPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => addNewContactPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('contacts', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('contact');
        queryClient.invalidateQueries('contacts');
      },
    }
  );
};

export const FetchAddNewContactPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  name,
  phone_number,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useAddNewContactPOST(
    { name, phone_number },
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
  return children({ loading, data, error, refetchAddNewContact: refetch });
};

export const createQuotePOST = async (
  Constants,
  { blocks, date, linked_ids, location },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/quote`;
  const options = {
    body: JSON.stringify({
      blocks: blocks,
      quote_date: date,
      location: location,
      linked_ids: linked_ids,
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useCreateQuotePOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => createQuotePOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('quotes', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('quote');
        queryClient.invalidateQueries('quotes');
      },
    }
  );
};

export const FetchCreateQuotePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  blocks,
  date,
  linked_ids,
  location,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useCreateQuotePOST(
    { blocks, date, linked_ids, location },
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
  return children({ loading, data, error, refetchCreateQuote: refetch });
};

export const deleteQuoteDELETE = async (
  Constants,
  { quote_id },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/quote`;
  const options = {
    body: JSON.stringify({ quote_id: quote_id }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'DELETE',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useDeleteQuoteDELETE = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => deleteQuoteDELETE(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('quotes', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('quote');
        queryClient.invalidateQueries('quotes');
      },
    }
  );
};

export const getContactsCountGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/get_contacts_count`;
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

export const useGetContactsCountGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xANOGetContactsCountGET', args],
    () => getContactsCountGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['xANOGetContactsCountGETS']),
    }
  );
};

export const FetchGetContactsCountGET = ({
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
  } = useGetContactsCountGET(
    {},
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
  return children({ loading, data, error, refetchGetContactsCount: refetch });
};

export const getFavoritesGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/favorites`;
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

export const useGetFavoritesGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xANOGetFavoritesGET', args],
    () => getFavoritesGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['xANOGetFavoritesGETS']),
    }
  );
};

export const FetchGetFavoritesGET = ({
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
  } = useGetFavoritesGET(
    {},
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
  return children({ loading, data, error, refetchGetFavorites: refetch });
};

export const getInboxCountGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/quote_inbox_count`;
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

export const useGetInboxCountGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['quotes', args],
    () => getInboxCountGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetInboxCountGET = ({
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
  } = useGetInboxCountGET(
    {},
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
  return children({ loading, data, error, refetchGetInboxCount: refetch });
};

export const getMyContactsGET = async (
  Constants,
  { random_seed, search_term },
  handlers = {}
) => {
  const paramsDict = {};
  if (search_term !== undefined) {
    paramsDict['search_term'] = renderParam(search_term);
  }
  if (random_seed !== undefined) {
    paramsDict['random_seed'] = renderParam(random_seed);
  }
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/get_my_contacts${renderQueryString(
    paramsDict
  )}`;
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

export const useGetMyContactsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xANOGetMyContactsGET', args],
    () => getMyContactsGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['xANOGetMyContactsGETS']),
    }
  );
};

export const FetchGetMyContactsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  random_seed,
  search_term,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetMyContactsGET(
    { random_seed, search_term },
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
  return children({ loading, data, error, refetchGetMyContacts: refetch });
};

export const getProfilePOST = async (
  Constants,
  { id, refresh, type },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/profile`;
  const options = {
    body: JSON.stringify({ id: id, type: type, refresh: refresh }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGetProfilePOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xANOGetProfilePOST', args],
    () => getProfilePOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['xANOGetProfilePOSTS']),
    }
  );
};

export const FetchGetProfilePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  id,
  refresh,
  type,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetProfilePOST(
    { id, refresh, type },
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
  return children({ loading, data, error, refetchGetProfile: refetch });
};

export const getQuotesInboxGET = async (
  Constants,
  { refetch_param },
  handlers = {}
) => {
  const paramsDict = {};
  if (refetch_param !== undefined) {
    paramsDict['r'] = renderParam(refetch_param);
  }
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/quote_inbox${renderQueryString(
    paramsDict
  )}`;
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

export const useGetQuotesInboxGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['quotes', args],
    () => getQuotesInboxGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchGetQuotesInboxGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  refetch_param,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetQuotesInboxGET(
    { refetch_param },
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
  return children({ loading, data, error, refetchGetQuotesInbox: refetch });
};

export const getRandomQuoteGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/get_random_quote`;
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

export const useGetRandomQuoteGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['quote', args],
    () => getRandomQuoteGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['quotes']),
    }
  );
};

export const FetchGetRandomQuoteGET = ({
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
  } = useGetRandomQuoteGET(
    {},
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
  return children({ loading, data, error, refetchGetRandomQuote: refetch });
};

export const getRecentsGET = async (Constants, _args, handlers = {}) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/recents`;
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

export const useGetRecentsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xANOGetRecentsGET', args],
    () => getRecentsGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['xANOGetRecentsGETS']),
    }
  );
};

export const FetchGetRecentsGET = ({
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
  } = useGetRecentsGET(
    {},
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
  return children({ loading, data, error, refetchGetRecents: refetch });
};

export const getRecentsAndFavoritesGET = async (
  Constants,
  _args,
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/recents_and_favorites`;
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

export const useGetRecentsAndFavoritesGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xANOGetRecentsAndFavoritesGET', args],
    () => getRecentsAndFavoritesGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['xANOGetRecentsAndFavoritesGETS']),
    }
  );
};

export const FetchGetRecentsAndFavoritesGET = ({
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
  } = useGetRecentsAndFavoritesGET(
    {},
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
  return children({
    loading,
    data,
    error,
    refetchGetRecentsAndFavorites: refetch,
  });
};

export const importContactsPOST = async (
  Constants,
  { contacts },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/import_contacts`;
  const options = {
    body: JSON.stringify({ contacts: contacts }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useImportContactsPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xANOImportContactsPOST', args],
    () => importContactsPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['xANOImportContactsPOSTS']),
    }
  );
};

export const FetchImportContactsPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  contacts,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useImportContactsPOST(
    { contacts },
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
  return children({ loading, data, error, refetchImportContacts: refetch });
};

export const searchContactsGET = async (Constants, { term }, handlers = {}) => {
  const paramsDict = {};
  if (term !== undefined) {
    paramsDict['term'] = renderParam(term);
  }
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/search_contacts${renderQueryString(
    paramsDict
  )}`;
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

export const useSearchContactsGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['contacts', args],
    () => searchContactsGET(Constants, args, handlers),
    {
      refetchInterval,
    }
  );
};

export const FetchSearchContactsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  term,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useSearchContactsGET(
    { term },
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
  return children({ loading, data, error, refetchSearchContacts: refetch });
};

export const toggleFavoritePOST = async (
  Constants,
  { connect_id, type },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/toggle_favorites`;
  const options = {
    body: JSON.stringify({ type: type, connect_id: connect_id }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useToggleFavoritePOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xANOToggleFavoritePOST', args],
    () => toggleFavoritePOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['xANOToggleFavoritePOSTS']),
    }
  );
};

export const FetchToggleFavoritePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  connect_id,
  type,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useToggleFavoritePOST(
    { connect_id, type },
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
  return children({ loading, data, error, refetchToggleFavorite: refetch });
};

export const toggleRecentsPOST = async (
  Constants,
  { connect_id, type },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/toggle_recents`;
  const options = {
    body: JSON.stringify({ type: type, connect_id: connect_id }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useToggleRecentsPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xANOToggleRecentsPOST', args],
    () => toggleRecentsPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['xANOToggleRecentsPOSTS']),
    }
  );
};

export const FetchToggleRecentsPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  connect_id,
  type,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useToggleRecentsPOST(
    { connect_id, type },
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
  return children({ loading, data, error, refetchToggleRecents: refetch });
};

export const updateProfileDOBPATCH = async (
  Constants,
  { dob, id, type },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/profile/${encodeQueryParam(
    id
  )}`;
  const options = {
    body: JSON.stringify({ type: type, dob: dob }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'PATCH',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUpdateProfileDOBPATCH = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      updateProfileDOBPATCH(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('profile', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('profile');
        queryClient.invalidateQueries('profiles');
      },
    }
  );
};

export const updateProfileImagePATCH = async (
  Constants,
  { id, profile_image, type },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/profile/${encodeQueryParam(
    id
  )}`;
  const options = {
    body: JSON.stringify({ type: type, profile_image: profile_image }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'PATCH',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUpdateProfileImagePATCH = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      updateProfileImagePATCH(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('profile', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('profile');
        queryClient.invalidateQueries('profiles');
      },
    }
  );
};

export const updateProfileNamePATCH = async (
  Constants,
  { id, name, type },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/profile/${encodeQueryParam(
    id
  )}`;
  const options = {
    body: JSON.stringify({ type: type, name: name }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'PATCH',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUpdateProfileNamePATCH = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      updateProfileNamePATCH(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('profile', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('profile');
        queryClient.invalidateQueries('profiles');
      },
    }
  );
};

export const updateProfilePhoneNumberPATCH = async (
  Constants,
  { id, phone_number, type },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/profile/${encodeQueryParam(
    id
  )}`;
  const options = {
    body: JSON.stringify({ type: type, phone_number: phone_number }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'PATCH',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUpdateProfilePhoneNumberPATCH = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      updateProfilePhoneNumberPATCH(
        Constants,
        { ...initialArgs, ...args },
        handlers
      ),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('profile', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('profile');
        queryClient.invalidateQueries('profiles');
      },
    }
  );
};

export const updatePushTokenPATCH = async (
  Constants,
  { id, push_token, type },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/profile/${encodeQueryParam(
    id
  )}`;
  const options = {
    body: JSON.stringify({ type: type, push_token: push_token }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'PATCH',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUpdatePushTokenPATCH = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      updatePushTokenPATCH(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('profile', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('profile');
        queryClient.invalidateQueries('profiles');
      },
    }
  );
};

export const updateQuoteLinkPATCH = async (
  Constants,
  { quote_links_id, visibility },
  handlers = {}
) => {
  const url = `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/quote_links/${encodeQueryParam(
    quote_links_id
  )}`;
  const options = {
    body: JSON.stringify({ visibilty: visibility }),
    headers: cleanHeaders({
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    }),
    method: 'PATCH',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUpdateQuoteLinkPATCH = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xANOUpdateQuoteLinkPATCH', args],
    () => updateQuoteLinkPATCH(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['xANOUpdateQuoteLinkPATCHES']),
    }
  );
};
