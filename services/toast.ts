import Toast from 'react-native-toast-message'

export class ToastService {
  // Default configuration
  private static defaultConfig = {
    successDuration: 3000,
    errorDuration: 4000,
    infoDuration: 3000,
    warningDuration: 3500,
    position: 'bottom' as 'top' | 'bottom',
    offset: 60,
  }

  /**
   * Show success toast
   */
  static success(title: string, message?: string, duration?: number) {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      visibilityTime: duration || this.defaultConfig.successDuration,
    })
  }

  /**
   * Show error toast
   */
  static error(title: string, message?: string, duration?: number) {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      visibilityTime: duration || this.defaultConfig.errorDuration,
    })
  }

  /**
   * Show info toast
   */
  static info(title: string, message?: string, duration?: number) {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      visibilityTime: duration || this.defaultConfig.infoDuration,
    })
  }

  /**
   * Show warning toast
   */
  static warning(title: string, message?: string, duration?: number) {
    Toast.show({
      type: 'warning',
      text1: title,
      text2: message,
      visibilityTime: duration || this.defaultConfig.warningDuration,
    })
  }

  /**
   * Authentication specific toasts
   */
  static auth = {
    loginSuccess: (userName?: string) => {
      this.success(
        'Login Successful',
        userName ? `Welcome back, ${userName}! 👋` : 'Welcome back! 👋'
      )
    },

    loginFailed: (reason: string) => {
      this.error('Login Failed', reason)
    },

    signupSuccess: () => {
      this.success('Account Created', 'Welcome to Renit! 🎉')
    },

    signupFailed: (reason: string) => {
      this.error('Signup Failed', reason)
    },

    logoutSuccess: () => {
      this.info('Logged Out', 'See you next time! 👋')
    },

    sessionExpired: () => {
      this.warning('Session Expired', 'Please log in again')
    },
  }

  /**
   * Network specific toasts
   */
  static network = {
    timeout: () => {
      this.error('Request Timeout', 'Please try again')
    },

    noConnection: () => {
      this.error('Network Error', 'Please check your connection')
    },

    serverError: (status?: number) => {
      this.error('Server Error', status ? `Error ${status}` : 'Something went wrong')
    },
  }

  /**
   * General app toasts
   */
  static app = {
    saved: (item?: string) => {
      this.success('Saved', item ? `${item} saved successfully` : 'Changes saved')
    },

    deleted: (item?: string) => {
      this.success('Deleted', item ? `${item} deleted` : 'Item deleted')
    },

    copied: () => {
      this.info('Copied', 'Copied to clipboard')
    },

    comingSoon: () => {
      this.info('Coming Soon', 'This feature will be available soon')
    },
  }

  /**
   * Hide all toasts
   */
  static hide() {
    Toast.hide()
  }

  /**
   * Get current configuration
   */
  static getConfig() {
    return { ...this.defaultConfig }
  }

  /**
   * Update default configuration
   */
  static updateConfig(config: Partial<typeof ToastService.defaultConfig>) {
    this.defaultConfig = { ...this.defaultConfig, ...config }
  }

  /**
   * Quick configuration presets
   */
  static presets = {
    /**
     * Configure toast to show at top
     */
    showAtTop: (offset = 60) => {
      this.updateConfig({ position: 'top', offset })
    },

    /**
     * Configure toast to show at bottom
     */
    showAtBottom: (offset = 60) => {
      this.updateConfig({ position: 'bottom', offset })
    },

    /**
     * Set fast toast durations (shorter display time)
     */
    fastToasts: () => {
      this.updateConfig({
        successDuration: 2000,
        errorDuration: 3000,
        infoDuration: 2000,
        warningDuration: 2500,
      })
    },

    /**
     * Set slow toast durations (longer display time)
     */
    slowToasts: () => {
      this.updateConfig({
        successDuration: 4000,
        errorDuration: 5000,
        infoDuration: 4000,
        warningDuration: 4500,
      })
    },
  }
}
