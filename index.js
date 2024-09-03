/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from 'react-native-background-fetch';

/// BackgroundFetch Android Headless Event Receiver.
/// Called when the Android app is terminated.
///
const backgroundFetchHeadlessTask = async event => {
  if (event.timeout) {
    console.log('[BackgroundFetch] 💀 HeadlessTask TIMEOUT: ', event.taskId);
    BackgroundFetch.finish(event.taskId);
    return;
  }

  console.log('[BackgroundFetch] 💀 HeadlessTask running: ', event.taskId);

  console.log('[BackgroundFetch] 💀 HeadlessTask stop()');
  BackgroundFetch.stop(event.taskId);
  console.log('[BackgroundFetch] 💀 HeadlessTask finish()');
  BackgroundFetch.finish(event.taskId);
};

/// Now register the handler.
BackgroundFetch.registerHeadlessTask(backgroundFetchHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
