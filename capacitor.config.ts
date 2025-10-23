import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.capcut.templateexplorer',
  appName: 'CapCut Template Explorer',
  webDir: 'dist',
  // IMPORTANT: Comment out 'server' section for production APK builds
  // Only use 'server' for hot-reload during development in Android Studio/Xcode
  // server: {
  //   url: 'https://6be872e2-eea8-47c5-9592-a15bdaa575b7.lovableproject.com?forceHideBadge=true',
  //   cleartext: true
  // },
  plugins: {
    AdMob: {
      testingDevices: [],
      initializeForTesting: true
    }
  }
};

export default config;
