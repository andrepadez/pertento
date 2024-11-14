import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription } from 'shadcn/dialog';
import { DialogFooter, DialogHeader, DialogTitle } from 'shadcn/dialog';
import { Button } from 'shadcn/button';
import { Wrench } from 'lucide-react';

export const ScriptsModal = ({ websiteId }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [copied, setCopied] = useState(null);
  const { origin } = window.location;
  const scriptTag = `<script defer id="pertentoScript" src="${origin}/pertentoRuntime.js?website-id=${websiteId}"></script>`;
  const opacityScript = `<style id=“pertento-style-opacity”>body { opacity: 0; }</style>
<script>setTimeout(() => { document.getElementById('pertento-style-opacity')?.remove() }, 500);</script>`;

  const copyToClipboard = (text) => async () => {
    const { origin } = window.location;
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 3000);
  };

  return (
    <div>
      <Button className="" variant="outline" onClick={() => setIsOpen(true)}>
        Implementation
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-10">Scripts</DialogTitle>
          </DialogHeader>
          <div className="grid gap-8">
            <div className="grid gap-2 p-4 border-2 rounded-md">
              <div className="flex justify-between">
                <h6>Main Integration</h6>
                {copied === scriptTag ? (
                  <a className="text-gray-400 hover:no-underline" disabled>
                    <strong>copied</strong>
                  </a>
                ) : (
                  <a onClick={copyToClipboard(scriptTag)}>copy</a>
                )}
              </div>
              <p className="text-gray-600">
                This main script enables your website to function seamlessly with Pertento's services. For optimal
                performance, include this script just before the closing &lt;/head&gt; tag. This implementation is
                essential to access Pertento's features.
              </p>
              <pre className="p-5 bg-gray-200">
                <code className="text-wrap">{scriptTag}</code>
              </pre>
            </div>
            <div className="grid gap-2 p-4 border-2 rounded-md">
              <div className="flex justify-between">
                <h6>Anti-Flicker Snippet</h6>
                {copied === opacityScript ? (
                  <a className="text-gray-400 hover:no-underline" disabled>
                    <strong>copied</strong>
                  </a>
                ) : (
                  <a onClick={copyToClipboard(opacityScript)}>copy</a>
                )}
              </div>
              <p className="text-gray-600">
                To reduce page flickering and prevent visible loading of changes, add this optional script as high as
                possible in the &lt;head&gt; section. This adjustment grants Pertento greater control over the page for
                a smoother user experience.
              </p>
              <pre className="p-5 bg-gray-200">
                <code className="text-wrap">{opacityScript}</code>
              </pre>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsOpen(false)}>
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
