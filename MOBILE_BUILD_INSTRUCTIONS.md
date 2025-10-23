# Mobile Build Instructions for Android & iOS

## ✅ Completed Features

### 1. **Cache System (10 minutes)**
- ✅ All templates, searches, and images are cached locally for 10 minutes
- ✅ No browser 5MB limit - uses native localStorage
- ✅ Faster repeat loading and limited offline functionality

### 2. **Back Navigation Fixed**
- ✅ Hardware back button works like in-app back button
- ✅ Minimizes app instead of closing when on home page
- ✅ Works on both Android and iOS

### 3. **AdMob Integration with Google Test IDs**
- ✅ **Banner Ads**: Adaptive banners appear randomly after every 3-4 template grids
- ✅ **Interstitial Ads**: Shows while search is running in background
- ✅ **Rewarded Ads**: "Watch Ad to Unlock" button on Template Detail page
- ✅ **Native Ads**: Placed at bottom of Template Detail page after action buttons

---

## 🚀 Next Steps to Build & Test

### For Testing (After git pull):

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the web app:**
   ```bash
   npm run build
   ```

3. **Sync with native platforms:**
   ```bash
   npx cap sync android
   # or for iOS:
   npx cap sync ios
   ```

4. **Run on device/emulator:**
   ```bash
   # For Android:
   npx cap run android
   
   # For iOS (Mac only):
   npx cap run ios
   ```

---

## 📱 Important Notes

### AdMob Test IDs (Currently Active)
The app uses Google's official test ad IDs. You'll see test ads that display:
- Banner: Test banner ad
- Interstitial: Test interstitial ad with countdown
- Rewarded: Test rewarded video ad
- Native: Test native ad content

**To use real ads in production:**
1. Create an AdMob account at https://admob.google.com
2. Create ad units for your app
3. Replace test IDs in `src/services/admob.ts` with your real ad unit IDs
4. Remove `initializeForTesting: true` from `capacitor.config.ts`

### Cache Behavior
- Templates are cached for 10 minutes after first load
- Searches are cached for 10 minutes
- Images are cached by the browser automatically
- Cache clears automatically after expiration

### Hardware Back Button
- On any page except home: navigates back to previous page
- On home page: minimizes the app (doesn't close it)

---

## 🔧 Troubleshooting

### If ads don't show:
- Make sure you ran `npm install` after pulling the code
- Ensure `npx cap sync` was run after building
- Test ads may take 1-2 seconds to load
- Check console logs for any AdMob errors

### If back button doesn't work:
- Make sure you ran `npx cap sync` after the changes
- Test on a real device (emulators may behave differently)

### For Production Build (APK/AAB):
```bash
cd android
./gradlew assembleRelease  # For APK
./gradlew bundleRelease    # For AAB (Play Store)
```

The signed APK will be in: `android/app/build/outputs/apk/release/`
The AAB will be in: `android/app/build/outputs/bundle/release/`

---

## 📦 What Changed

### New Files:
- `src/services/admob.ts` - AdMob service with all ad types
- `src/hooks/useBackButton.ts` - Hardware back button handler
- `src/components/BannerAd.tsx` - Banner ad component
- `src/components/NativeAd.tsx` - Native ad component

### Modified Files:
- `src/services/cache.ts` - Changed cache duration to 10 minutes
- `src/services/api.ts` - Integrated cache into API calls
- `src/pages/Home.tsx` - Added banner ads and back button handling
- `src/pages/Search.tsx` - Added interstitial ad on search and banner ads
- `src/pages/TemplateDetail.tsx` - Added rewarded ad unlock + native ad
- `capacitor.config.ts` - Added AdMob configuration

### New Dependencies:
- `@capacitor/app` - For back button handling
- `@capacitor-community/admob` - For AdMob integration
