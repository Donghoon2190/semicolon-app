import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { InMemoryCache } from "apollo-cache-inmemory";
import { Asset } from "expo-asset";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import options from './apollo';
import { ThemeProvider } from "styled-components";
import styles from './styles';
import NavController from './components/NavController';
import { AuthProvider } from './AuthContext';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {

      await Font.loadAsync({
        ...AntDesign.font
      });
      await Asset.loadAsync([require("./assets/logo.png")])
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...options
      })
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client ? (
    <ApolloProvider clietn={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
      <AppLoading />
    )
}
