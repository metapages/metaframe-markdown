import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import help from '/@/README.md?raw';
import {
  HashKeyMarkdown,
  HashKeyMarkdownLegacy,
  HashKeyUrl,
} from '/@/store';

import {
  setHashParamInWindow,
  useHashParam,
  useHashParamBase64,
} from '@metapages/hash-query';
import { useMetaframeAndInput } from '@metapages/metaframe-hook';

let HELP = help;
if (import.meta.env.MODE === "development" && import.meta.env.VITE_APP_ORIGIN) {
  HELP = HELP.replaceAll(
    "https://markdown.mtfm.io/",
    import.meta.env.VITE_APP_ORIGIN as string
  );
}

// Not used yet, but here as a reference
export const encodeMarkdown = (md: string) => {
  var b64 = window.btoa(encodeURIComponent(md));
  return b64;
};

const decodeMarkdown = (b64: string) => {
  return decodeURIComponent(window.atob(b64));
};

export const useMarkdown = (): [string, (m: string) => void] => {
  
  const metaframeBlob = useMetaframeAndInput();
  const [url] = useHashParam(HashKeyUrl);
  const [markdownFromHashParamLegacy] = useHashParamBase64(HashKeyMarkdownLegacy);
  const [markdownFromHashParam, setMarkdownInHashParam] = useHashParamBase64(HashKeyMarkdown);
  const [markdown, setMarkdown] = useState<string>("");
  const markdownFromUrlRef = useRef<string | undefined>(undefined);

  const exportSetMarkdown = useCallback((markdown: string) => {
    if (markdownFromUrlRef.current !== markdown) {
      setMarkdownInHashParam(markdown === "" ? undefined : markdown);
      // Remove url key if it exists
      setHashParamInWindow(HashKeyUrl, undefined);
    }
  }, [setMarkdownInHashParam]);

  // whatever metaframe inputs we get, assume raw markdown, render
  useEffect(() => {

    if (!metaframeBlob.inputs) {
      return;
    }

    if (metaframeBlob.inputs["markdown"]) {
        setMarkdown(metaframeBlob.inputs["markdown"]);
        return;
    } else if (metaframeBlob.inputs["md"]) {
        setMarkdown(metaframeBlob.inputs["md"]);
        return;
    } else if (metaframeBlob.inputs["markdown-base64"] || metaframeBlob.inputs["md-base64"]) {
        let data = metaframeBlob.inputs["markdown-base64"] || metaframeBlob.inputs["md-base64"];
        if (data) {
            try {
                data = decodeMarkdown(data);
            } catch (err) {
                setMarkdown(
                `# Error atob from base64 metaframe input:\n\n - key: "${metaframeBlob.inputs["markdown-base64"] ? "markdown-base64" : "md-base64"}"\n - value: ${data} \n - err: ${err}`
                );
                return;
            }
            setMarkdown(data);
        }
    }
  }, [metaframeBlob.inputs, setMarkdown]);

  // if url hash param, use that
  useEffect(() => {
    if (!url || url === "") {
      return;
    }
    (async () => {
      const resp = await fetch(url, {
        mode: "cors",
      });
      if (!resp.ok) {
        setMarkdown(
          `# Error getting URL: ${url}\n\n - status: ${resp.status}\n - statusText: ${resp.statusText}`
        );
        return;
      }
      const payload = await resp.text();
      markdownFromUrlRef.current = payload;
      setMarkdown(payload);
    })();
  }, [url, setMarkdown]);

  // if base64 hash param, use that
  useEffect(() => {
    if ((!markdownFromHashParam || markdownFromHashParam === "") && (!markdownFromHashParamLegacy|| markdownFromHashParamLegacy === "")) {
      return;
    }
    setMarkdown(markdownFromHashParam || markdownFromHashParamLegacy);
  }, [markdownFromHashParam, setMarkdown]);

  return [markdown, exportSetMarkdown];
};
