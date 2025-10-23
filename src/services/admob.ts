import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, InterstitialAdPluginEvents, RewardAdPluginEvents, AdMobError } from '@capacitor-community/admob';

// Google AdMob Test IDs
export const AD_UNITS = {
  banner: 'ca-app-pub-3940256099942544/6300978111', // Test Banner ID
  interstitial: 'ca-app-pub-3940256099942544/1033173712', // Test Interstitial ID
  rewarded: 'ca-app-pub-3940256099942544/5224354917', // Test Rewarded ID
  native: 'ca-app-pub-3940256099942544/2247696110', // Test Native ID
};

class AdMobService {
  private initialized = false;
  private interstitialLoaded = false;
  private rewardedLoaded = false;

  async initialize() {
    if (this.initialized) return;
    
    try {
      await AdMob.initialize({
        testingDevices: [],
        initializeForTesting: true,
      });
      this.initialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
    }
  }

  async showBanner() {
    await this.initialize();
    
    try {
      const options: BannerAdOptions = {
        adId: AD_UNITS.banner,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
      };
      
      await AdMob.showBanner(options);
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  }

  async hideBanner() {
    try {
      await AdMob.hideBanner();
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }

  async prepareInterstitial() {
    await this.initialize();
    
    try {
      await AdMob.prepareInterstitial({
        adId: AD_UNITS.interstitial,
      });
      this.interstitialLoaded = true;
    } catch (error) {
      console.error('Failed to prepare interstitial ad:', error);
      this.interstitialLoaded = false;
    }
  }

  async showInterstitial(): Promise<boolean> {
    if (!this.interstitialLoaded) {
      await this.prepareInterstitial();
    }
    
    try {
      await AdMob.showInterstitial();
      this.interstitialLoaded = false;
      return true;
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
      this.interstitialLoaded = false;
      return false;
    }
  }

  async prepareRewarded() {
    await this.initialize();
    
    try {
      await AdMob.prepareRewardVideoAd({
        adId: AD_UNITS.rewarded,
      });
      this.rewardedLoaded = true;
    } catch (error) {
      console.error('Failed to prepare rewarded ad:', error);
      this.rewardedLoaded = false;
    }
  }

  async showRewarded(): Promise<boolean> {
    if (!this.rewardedLoaded) {
      await this.prepareRewarded();
    }
    
    return new Promise((resolve) => {
      let rewarded = false;

      AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
        rewarded = true;
      });

      AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        this.rewardedLoaded = false;
        resolve(rewarded);
      });

      AdMob.addListener(RewardAdPluginEvents.FailedToShow, (error: AdMobError) => {
        console.error('Failed to show rewarded ad:', error);
        this.rewardedLoaded = false;
        resolve(false);
      });

      AdMob.showRewardVideoAd().catch((error) => {
        console.error('Error showing rewarded ad:', error);
        this.rewardedLoaded = false;
        resolve(false);
      });
    });
  }

  // Preload interstitial for search
  preloadForSearch() {
    this.prepareInterstitial();
  }
}

export const adMobService = new AdMobService();
