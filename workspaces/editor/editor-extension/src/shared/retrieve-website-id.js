export const retrieveWebsiteId = async (tabId) => {
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      args: [tabId],
      func: (tabId) => {
        const script = document.getElementById('pertentoScript');
        if (!script) {
          return { websiteId: 0, tabId };
        }
        const url = new URL(script.src);
        const websiteId = +url.searchParams.get('website-id');
        return { websiteId, tabId };
      },
    });
    return result;
  } catch (ex) {
    if (typeof alert !== 'undefined') {
      alert('error' + ex);
    }
    console.log('error', tabId, ex);
  }
};
