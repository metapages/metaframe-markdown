import {
  useEffect,
  useRef,
} from 'react';

import { useOptions } from '/@/hooks/useOptions';
import md from 'markdown-it';
import Mermaid from 'mermaid';

import { useMarkdown } from '../hooks/useMarkdown';
import { MermaidPlugIn } from '../markdown-plugins/mermaid';
import example_plugin from '../markdown-plugins/single-screen';

/**
 * Just an example very basic output of incoming inputs
 *
 */
export const PanelMain: React.FC = () => {
  const [options] = useOptions();
  const divToRender = useRef<HTMLDivElement>(null);

  const [markdown, setMarkdown] = useMarkdown();

  // render
  useEffect(() => {
    if (!markdown || markdown === "" || !divToRender?.current) {
      return;
    }
    try {
      const MD = md({
        html: true,
        linkify: true,
        typographer: true,
      });
      MD.use(MermaidPlugIn);
      MD.use(example_plugin, options || {});

      var result = MD.render(markdown);
      divToRender.current!.innerHTML = result;
      Mermaid.run();
    } catch (err) {
      setMarkdown(
        `# Error rendering markdown \n\n - markdown: \`${markdown}\` \n - err: ${err}`
      );
    }
  }, [markdown, divToRender, options]);

  return (
    <div
      style={RootStyles[options?.displaymode || "default"]}
      ref={divToRender}
    />
  );
};

const RootStyles: Record<string, any> = {
  default: {},
  slide: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
};
