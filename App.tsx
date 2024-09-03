/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';

function backgroundFetchStatusToString(status: number) {
  switch (status) {
    case 0:
      return 'STATUS_RESTRICTED';
    case 1:
      return 'STATUS_DENIED';
    case 2:
      return 'STATUS_AVAILABLE';
    default:
      return 'UNKNOWN';
  }
}

async function startBgService() {
  const backgroundFetchFeatureStatus = await BackgroundFetch.status();
  if (backgroundFetchFeatureStatus === BackgroundFetch.STATUS_AVAILABLE) {
    const configureStatus = await BackgroundFetch.configure(
      {
        enableHeadless: true,
        startOnBoot: false,
        stopOnTerminate: false,
        // Configuring `forceAlarmManager: true` will bypass `JobScheduler`
        // to use Android's older `AlarmManager` API resulting in more accurate task-execution
        // at the cost of **higher battery usage**
        forceAlarmManager: false, //__DEV__,
        minimumFetchInterval: 15,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        requiresBatteryNotLow: true,
        requiresCharging: false,
        requiresDeviceIdle: false,
        requiresStorageNotLow: false,
      },
      async (taskId: string) => {
        console.log('On event callback');
        await BackgroundFetch.stop(taskId);
        BackgroundFetch.finish(taskId);
      },
      async (taskId: string) => {
        console.log('On timeout callback');
        await BackgroundFetch.stop(taskId);
        BackgroundFetch.finish(taskId);
      },
    );

    console.log(backgroundFetchStatusToString(configureStatus));
  }
}

function App(): React.JSX.Element {
  const onPress = useCallback(() => {
    startBgService().catch(console.error);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>Register background fetch</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'cyan',
  },
});

export default App;
