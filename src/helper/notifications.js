import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

const NOTIFICATION_KEY = `notification`;

export async function clearLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  Notifications.cancelAllScheduledNotificationsAsync();
}

export async function setLocalNotification() {
  // This is where we store our notification status
  const isNotificationActive = JSON.parse(
    await AsyncStorage.getItem(NOTIFICATION_KEY)
  );
  if (!isNotificationActive) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === `granted`) {
      setNotificationForTomorrow();
    }
  }
}

function createNotification() {
  return {
    title: `Do your quiz!`,
    body: `Statistics show that people who do their quiz are more successful in life.`,
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: `high`,
      sticky: false,
      vibrate: true
    }
  };
}

// Returns a Date object for `tomorrow at 20:00`
function getNextNotificationTime() {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);
  return tomorrow;
}

function setNotificationForTomorrow() {
  // Cancel existing notification
  Notifications.cancelAllScheduledNotificationsAsync();

  Notifications.scheduleLocalNotificationAsync(createNotification(), {
    time: getNextNotificationTime(),
    repeat: `day`
  });
  // Save status in storage
  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
}
