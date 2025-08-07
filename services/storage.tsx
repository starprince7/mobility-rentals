import AsyncStorage from '@react-native-async-storage/async-storage';

const sessionKey = "car-rental-session";

export const setAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(sessionKey, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

export const getAuthToken = async (): Promise<string> => {
  try {
    const token = await AsyncStorage.getItem(sessionKey);
    return token || "";
  } catch (error) {
    return "";
  }
};

export const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(sessionKey);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};
