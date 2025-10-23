import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

export const useBackButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const listener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        navigate(-1);
      } else {
        // On home page, minimize app instead of closing
        CapacitorApp.minimizeApp();
      }
    });

    return () => {
      listener.then(l => l.remove());
    };
  }, [navigate]);
};
