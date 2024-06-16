export const changeExtensionIcon = (isActive) => {
  if (isActive) {
    chrome.action.setIcon({
      path: {
        16: 'logos/logo-16.png',
        48: 'logos/logo-48.png',
        128: 'logos/logo-128.png',
      },
    });
  } else {
    chrome.action.setIcon({
      path: {
        16: 'logos/logo-bw-16.png',
        48: 'logos/logo-bw-48.png',
        128: 'logos/logo-bw-128.png',
      },
    });
  }
};
