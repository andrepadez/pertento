const parseEditorUrl = (originalURL, wordToRemove = 'pertento') => {
  // Parse the original URL
  const url = new URL(originalURL);
  const searchParams = new URLSearchParams(url.search);
  const newSearchParams = new URLSearchParams();
  const wordData = {};

  // Iterate through query parameters and remove those starting with the specified word
  for (const [key, val] of searchParams.entries()) {
    if (key.startsWith(wordToRemove)) {
      wordData[key] = val;
    } else {
      newSearchParams.append(key, val);
    }
  }

  // Reconstruct the URL without parameters starting with the specified word
  url.search = newSearchParams.toString();

  return [url.href, wordData];
};

export default parseEditorUrl;
