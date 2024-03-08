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
import encodeQueryParam from '../utils/encodeQueryParam';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const addNewContactPOST = (Constants, { name }, handlers = {}) =>
  fetch(`https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/contact`, {
    body: JSON.stringify({ name: name }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

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
    { name },
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

export const createQuotePOST = (
  Constants,
  { blocks, date, linked_ids, location },
  handlers = {}
) =>
  fetch(`https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/quote`, {
    body: JSON.stringify({
      blocks: blocks,
      quote_date: date,
      location: location,
      linked_ids: linked_ids,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

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

export const deleteQuoteDELETE = (Constants, { quote_id }, handlers = {}) =>
  fetch(`https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/quote`, {
    body: JSON.stringify({ quote_id: quote_id }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  }).then(res => handleResponse(res, handlers));

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

export const getInboxCountGET = (Constants, _args, handlers = {}) =>
  fetch(`https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/quote_inbox_count`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    },
  }).then(res => handleResponse(res, handlers));

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

export const getMyContactsGET = (
  Constants,
  { random_seed, search_term },
  handlers = {}
) =>
  fetch(
    `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/get_my_contacts?search_term=${encodeQueryParam(
      `${
        typeof search_term === 'string'
          ? search_term
          : JSON.stringify(search_term ?? '')
      }`
    )}&refetch=${encodeQueryParam(
      `${
        typeof random_seed === 'string'
          ? random_seed
          : JSON.stringify(random_seed ?? '')
      }`
    )}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['CX_AUTH_TOKEN'],
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

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

export const getProfilePOST = (Constants, { id, type }, handlers = {}) =>
  fetch(`https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/profile`, {
    body: JSON.stringify({ id: id, type: type }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useGetProfilePOST = (initialArgs = {}, { handlers = {} } = {}) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => getProfilePOST(Constants, { ...initialArgs, ...args }, handlers),
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

export const FetchGetProfilePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  id,
  type,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useGetProfilePOST(
    { id, type },
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

export const getQuotesInboxGET = (
  Constants,
  { refetch_param },
  handlers = {}
) =>
  fetch(
    `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/quote_inbox?r=${encodeQueryParam(
      `${
        typeof refetch_param === 'string'
          ? refetch_param
          : JSON.stringify(refetch_param ?? '')
      }`
    )}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['CX_AUTH_TOKEN'],
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

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

export const importContactsPOST = (Constants, { contacts }, handlers = {}) =>
  fetch(`https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/import_contacts`, {
    body: JSON.stringify({ contacts: contacts }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['CX_AUTH_TOKEN'],
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

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

export const searchContactsGET = (Constants, { term }, handlers = {}) =>
  fetch(
    `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/search_contacts?term=${encodeQueryParam(
      `${typeof term === 'string' ? term : JSON.stringify(term ?? '')}`
    )}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['CX_AUTH_TOKEN'],
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

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

export const updateProfileDOBPATCH = (
  Constants,
  { dob, id, type },
  handlers = {}
) =>
  fetch(
    `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/profile/${
      typeof id === 'string' ? id : JSON.stringify(id ?? '')
    }`,
    {
      body: JSON.stringify({ type: type, dob: dob }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['CX_AUTH_TOKEN'],
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    }
  ).then(res => handleResponse(res, handlers));

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

export const updateProfileImagePATCH = (
  Constants,
  { id, profile_image, type },
  handlers = {}
) =>
  fetch(
    `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/profile/${
      typeof id === 'string' ? id : JSON.stringify(id ?? '')
    }`,
    {
      body: JSON.stringify({ type: type, profile_image: profile_image }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['CX_AUTH_TOKEN'],
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    }
  ).then(res => handleResponse(res, handlers));

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

export const updateProfileNamePATCH = (
  Constants,
  { id, name, type },
  handlers = {}
) =>
  fetch(
    `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/profile/${
      typeof id === 'string' ? id : JSON.stringify(id ?? '')
    }`,
    {
      body: JSON.stringify({ type: type, name: name }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['CX_AUTH_TOKEN'],
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    }
  ).then(res => handleResponse(res, handlers));

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

export const updateQuoteLinkPATCH = (
  Constants,
  { quote_links_id, visibility },
  handlers = {}
) =>
  fetch(
    `https://xxxn-hde9-kulk.n7c.xano.io/api:zur83CUB/quote_links/${
      typeof quote_links_id === 'string'
        ? quote_links_id
        : JSON.stringify(quote_links_id ?? '')
    }`,
    {
      body: JSON.stringify({ visibilty: visibility }),
      headers: {
        Accept: 'application/json',
        Authorization: Constants['CX_AUTH_TOKEN'],
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    }
  ).then(res => handleResponse(res, handlers));

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
