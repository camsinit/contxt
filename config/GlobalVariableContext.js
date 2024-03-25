import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DeviceVariables = {
  CX_AUTH_TOKEN:
    'eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.KbQkIkDjxXRqzq6HEUfXbV1OtOsmL6pXS6DbkmRjS9LVrl97MeDV_6VDyhIL-PLFtYDqJNJvDE361igUHqGr-fJz9eNofYRv.vA_rtHo6-GoBU3HWgNuLjg.-0-zybEyVhQ5qhxBjQFqiQa79tPeC8J56zzFKGM6193FXPraA2zyHiZJ5Bb8WM6wOKH_Vnh9cs7rQhIHKSMsL7yGcBde95PsEYFP5rIT8kdy_jYgp223le06GOboYiYa.CVl2qzwaTPh1oc8r0C7wWWI84avmB-eWLWx9R7ec_oo',
  CX_USER: {},
  RECENT_CONTACTS: [],
  __env__: 'Development',
};
export const AppVariables = {};
const GlobalVariableContext = React.createContext();
const GlobalVariableUpdater = React.createContext();
const keySuffix = '';

// Attempt to parse a string as JSON. If the parse fails, return the string as-is.
// This is necessary to account for variables which are already present in local
// storage, but were not stored in JSON syntax (e.g. 'hello' instead of '"hello"').
function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

class GlobalVariable {
  /**
   *  Filters an object of key-value pairs for those that should be
   *  persisted to storage, and persists them.
   *
   *  @param values Record<string, string>
   */
  static async syncToLocalStorage(values) {
    const update = Object.entries(values)
      .filter(([key]) => key in DeviceVariables)
      .map(([key, value]) => [key + keySuffix, JSON.stringify(value)]);

    if (update.length > 0) {
      await AsyncStorage.multiSet(update);
    }

    return update;
  }

  static async loadLocalStorage() {
    const keys = Object.keys(DeviceVariables);
    const entries = await AsyncStorage.multiGet(
      keySuffix ? keys.map(k => k + keySuffix) : keys
    );

    // If values isn't set, use the default. These will be written back to
    // storage on the next render.
    const withDefaults = entries.map(([key_, value]) => {
      // Keys only have the suffix appended in storage; strip the key
      // after they are retrieved
      const key = keySuffix ? key_.replace(keySuffix, '') : key_;
      return [key, value ? tryParseJson(value) : DeviceVariables[key]];
    });

    return Object.fromEntries(withDefaults);
  }
}

class State {
  static defaultValues = {
    ...AppVariables,
    ...DeviceVariables,
  };

  static reducer(state, { type, payload }) {
    switch (type) {
      case 'RESET':
        return { values: State.defaultValues, __loaded: true };
      case 'LOAD_FROM_ASYNC_STORAGE':
        return { values: { ...state.values, ...payload }, __loaded: true };
      case 'UPDATE':
        return state.__loaded
          ? {
              ...state,
              values: {
                ...state.values,
                [payload.key]: payload.value,
              },
            }
          : state;
      default:
        return state;
    }
  }

  static initialState = {
    __loaded: false,
    values: State.defaultValues,
  };
}

export function GlobalVariableProvider({ children }) {
  const [state, dispatch] = React.useReducer(State.reducer, State.initialState);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  // This effect runs on mount to overwrite the default value of any
  // key that has a local value.
  React.useEffect(() => {
    async function initialStorageLoader() {
      try {
        const payload = await GlobalVariable.loadLocalStorage();
        if (
          payload?.__env__ &&
          DeviceVariables.__env__ &&
          payload.__env__ !== DeviceVariables.__env__
        ) {
          console.log(
            `Publication Environment changed from ${payload.__env__} to ${DeviceVariables.__env__}. Refreshing variables`
          );
          dispatch({
            type: 'LOAD_FROM_ASYNC_STORAGE',
            payload: DeviceVariables,
          });
        } else {
          dispatch({ type: 'LOAD_FROM_ASYNC_STORAGE', payload });
        }
      } catch (err) {
        console.error(err);
      }
    }
    initialStorageLoader();
  }, []);

  // This effect runs on every state update after the initial load. Gives us
  // best of both worlds: React state updates sync, but current state made
  // durable next async tick.
  React.useEffect(() => {
    async function syncToAsyncStorage() {
      try {
        await GlobalVariable.syncToLocalStorage(state.values);
      } catch (err) {
        console.error(err);
      }
    }
    if (state.__loaded) {
      syncToAsyncStorage();
    }
  }, [state]);

  const onLayoutRootView = React.useCallback(async () => {
    if (state.__loaded) {
      await SplashScreen.hideAsync();
    }
  }, [state.__loaded]);

  // We won't want an app to read a default state when there might be one
  // incoming from storage.
  if (!state.__loaded) {
    return null;
  }

  return (
    <GlobalVariableUpdater.Provider
      value={dispatch}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableContext.Provider value={state.values}>
        {children}
      </GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  );
}

// Hooks
export function useSetValue() {
  const dispatch = React.useContext(GlobalVariableUpdater);
  return ({ key, value }) => {
    dispatch({ type: 'UPDATE', payload: { key, value } });
    return value;
  };
}

export function useValues() {
  return React.useContext(GlobalVariableContext);
}
