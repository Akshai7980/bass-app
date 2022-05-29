/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';

import App from './App';

import {Provider} from "react-redux";
import configureStore from "./store";

import {name as appName} from './app.json';
const store = configureStore();


const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
  )
AppRegistry.registerComponent(appName, () => RNRedux);
