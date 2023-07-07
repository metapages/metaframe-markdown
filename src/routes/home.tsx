import { useEffect } from 'react';

import md from 'markdown-it';
import Mermaid from 'mermaid';
import { FunctionalComponent } from 'preact';
import {
  useRef,
  useState,
} from 'preact/hooks';

import {
  useHashParam,
  useHashParamBase64,
} from '@metapages/hash-query';
import { useMetaframeAndInput } from '@metapages/metaframe-hook';

// import markdownItMermaid from '@wekanteam/markdown-it-mermaid';
import { MermaidPlugIn } from '../components/mermaid';
import help from '../README.md?raw';

const encodeMarkdown = (md: string) => {
  var b64 = window.btoa(encodeURIComponent(md));
  return b64;
}

const decodeMarkdown = (b64: string) => {
  return decodeURIComponent(window.atob( b64 ));
}

// const MD = md("commonmark");
const MD = md({
  html: true,
  linkify: true,
  typographer: true,
});
MD.use(MermaidPlugIn);

let HELP = help;
if (import.meta.env.MODE === "development" && import.meta.env.VITE_APP_ORIGIN) {
  HELP = HELP.replaceAll(
    "https://markdown.mtfm.io/",
    import.meta.env.VITE_APP_ORIGIN as string
  );
}

export const Route: FunctionalComponent = () => {
  const metaframeBlob = useMetaframeAndInput();
  const [url] = useHashParam("url");
  const [base64] = useHashParamBase64("base64");
  const [markdown, setMarkdown] = useState<string>("");
  const divToRender = useRef<HTMLDivElement>(null);

  // if there's no URL parameters, default to showing the help
  useEffect(() => {
    let timeout: number | undefined;
    if (markdown === "" && !url && !base64) {
      timeout = setTimeout(() => {
        setMarkdown(HELP);
      }, 200);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [url, base64, markdown, setMarkdown]);

  // whatever metaframe inputs we get, assume raw markdown, render
  useEffect(() => {
    if (!metaframeBlob.inputs) {
      return;
    }
    var oneKey = Object.keys(metaframeBlob.inputs)[0];
    if (!oneKey) {
      return;
    }
    let data = metaframeBlob.inputs[oneKey];
    if (data) {
      try {
        if (oneKey.endsWith("base64")) {
          data = decodeMarkdown(data);
        }
      } catch (err) {
        setMarkdown(
          `# Error atob from base64 metaframe input:\n\n - key: ${oneKey}\n - value: ${data} \n - err: ${err}`
        );
        return;
      }
      setMarkdown(data);
    }
  }, [metaframeBlob.inputs, setMarkdown]);

  // if url hash param, use that
  useEffect(() => {
    if (!url || url === "") {
      return;
    }
    (async () => {
      const resp = await fetch(url);
      if (!resp.ok) {
        setMarkdown(
          `# Error getting URL: ${url}\n\n - status: ${resp.status}\n - statusText: ${resp.statusText}`
        );
        return;
      }
      const payload = await resp.text();
      setMarkdown(payload);
    })();
  }, [url, setMarkdown]);

  // if base64 hash param, use that
  useEffect(() => {
    if (!base64 || base64 === "") {
      return;
    }
    setMarkdown(base64);
  }, [base64, setMarkdown]);

  // render
  useEffect(() => {
    if (!markdown || markdown === "" || !divToRender?.current) {
      return;
    }
    try {
      var result = MD.render(markdown);
      divToRender.current!.innerHTML = result;
      Mermaid.run();
    } catch (err) {
      setMarkdown(
        `# Error rendering markdown \n\n - markdown: \`${markdown}\` \n - err: ${err}`
      );
    }
  }, [markdown, divToRender]);

  return <div ref={divToRender} />;
};
