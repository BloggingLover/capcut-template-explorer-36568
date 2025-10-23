import { useEffect, useState } from 'react';
import { adMobService } from '@/services/admob';

export const BannerAd = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showAd = async () => {
      await adMobService.showBanner();
      setVisible(true);
    };

    showAd();

    return () => {
      if (visible) {
        adMobService.hideBanner();
      }
    };
  }, []);

  // Reserve space for the banner ad to prevent layout shift
  return <div className="h-[50px] w-full" />;
};
