import AsyncStorage from '@react-native-async-storage/async-storage';

const sessionKey = "mobility-rental-session";
const registerSessionKey = "mobility-rental-session-register";

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
    console.error('Error getting auth token:', error);
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

export const setRegisterAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(registerSessionKey, token);
  } catch (error) {
    console.error('Error saving register auth token:', error);
  }
};

export const getRegisterAuthToken = async (): Promise<string> => {
  try {
    const token = await AsyncStorage.getItem(registerSessionKey);
    return token || "";
  } catch (error) {
    console.error('Error getting register auth token:', error);
    return "";
  }
};

export const removeRegisterAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(registerSessionKey);
  } catch (error) {
    console.error('Error removing register auth token:', error);
  }
};
