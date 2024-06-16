import { useEffect } from 'react';
import { useGlobal } from 'hooks/useGlobal';
import { useIframe } from '@/state/useIframe';
import DEVICES from 'misc/devices';

export const useDevices = () => {
  const [device, setDevice] = useGlobal('DEVICE', DEVICES[0]);
  const [margins, setMargins] = useGlobal('DEVICE_MARGINS', null);
  const { topWindow, websiteIframeWrapper } = useIframe();

  useEffect(() => {
    if (websiteIframeWrapper) {
      if (device.name === 'DESKTOP') {
        websiteIframeWrapper.style.width = '100%';
        websiteIframeWrapper.style.height = topWindow.innerHeight - 90 + 'px';
        websiteIframeWrapper.style.margin = '0';
        setMargins({ top: 0, left: 0 });
      }
      if (device.name === 'MOBILE') {
        websiteIframeWrapper.style.width = '375px';
        websiteIframeWrapper.style.height = '667px';
        websiteIframeWrapper.style.margin = '100px auto 0';
        setMargins({ top: 100, left: (topWindow.innerWidth - 375) / 2 });
      }
      if (device.name === 'TABLET') {
        websiteIframeWrapper.style.width = '1280px';
        websiteIframeWrapper.style.height = '667px';
        websiteIframeWrapper.style.margin = '100px auto 0';
        setMargins({ top: 100, left: (topWindow.innerWidth - 1280) / 2 });
      }
      if (!!device.width && !!device.height) {
        websiteIframeWrapper.style.width = device.width;
        websiteIframeWrapper.style.height = device.height;
        websiteIframeWrapper.style.margin = '50px auto 0';
        const left = (topWindow.innerWidth - parseInt(device.width, 10)) / 2;
        setMargins({ top: 50, left });
      }
    }
  }, [websiteIframeWrapper, device]);

  const getMargins = () => {
    return margins;
  };

  return { DEVICES, device, setDevice, margins, getMargins };
};
