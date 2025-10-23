import { useEffect, useRef } from 'react';
import { Card } from './ui/card';

export const NativeAd = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Native ads require more complex setup with custom layouts
    // This is a placeholder that reserves space
    // In production, you would implement custom native ad templates
    console.log('Native ad placeholder mounted');
  }, []);

  return (
    <Card className="p-4 bg-muted/50">
      <div ref={adRef} className="min-h-[100px] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Sponsored Content</p>
      </div>
    </Card>
  );
};
