import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import packageJson from "@/package.json";
import { StorageService, ToastService } from "@/services";
import { store } from "@/store";
// import { logOutAction } from "@/store/auth/actions";
import { Dimensions } from 'react-native';

const API_ENDPOINT = process.env.EXPO_PUBLIC_APP_API_URL;

if (!API_ENDPOINT) {
  console.error('❌ EXPO_PUBLIC_APP_API_URL is not set in environment variables!');
}

const deviceId = Device.osName === 'Android' ? Application.getAndroidId() : Application.nativeApplicationVersion;

const getDeviceInfo = () => ({
  brand: Device.brand,                    // e.g., "Apple" or "Samsung"
  modelName: Device.modelName,            // e.g., "iPhone 13" or "SM-G960F"
  deviceType: Device.deviceType,          // 1: Phone, 2: Tablet, 3: Desktop, 4: TV
  osName: Device.osName,                  // e.g., "iOS" or "Android"
  osVersion: Device.osVersion,            // e.g., "15.0"
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
    "product-token": "",
    mobileAppSrc: "rentit/mobile-app/package-version",
    device: deviceId,
    session: `${new Date()}`,
    "device-info": JSON.stringify(getDeviceInfo()),
  },
});

apiClient.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    const token = await StorageService.getAuthToken();

    if (token) {
      request.headers.set('authorization', `Bearer ${token}`);
    }

    // Get Device & App info per request
    const deviceId = Device.osName === 'Android' ? Application.getAndroidId() : Application.nativeApplicationVersion;
    const session = new Date().getTime();
    const { name, version } = packageJson;
    const platform = Device.osName?.toLowerCase() || 'unknown';
    const mobileAppSrc = `${name}/${platform}/${version}`;

    request.headers.set('device', deviceId);
    request.headers.set('session', session.toString());
    request.headers.set('mobileAppSrc', mobileAppSrc);

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  async (response: AxiosResponse<any, any>) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      // Handle response error
    } else if (error.request) {
      ToastService.network.noConnection()
    }

    if (error.response?.status && error.response?.status === 401) {
      //   store?.dispatch(logOutAction());
    }
    return Promise.reject(error);
  }
);

export default apiClient;
