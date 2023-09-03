import {
  useEffect,
  useRef,
} from 'react';

import md from 'markdown-it';
import markdownAnchor from 'markdown-it-anchor';
import Mermaid from 'mermaid';

import { useMarkdown } from '../hooks/useMarkdown';
import { MermaidPlugIn } from '../markdown-plugins/mermaid';
import SingleScreenPlugin from '../markdown-plugins/single-screen';
import { useOptions } from './options/useOptions';

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
      MD.use(SingleScreenPlugin, options || {});
      MD.use(markdownAnchor, { level: [1, 2, 3] });
      

      const rules = options?.dm === 'slide' ? {
        
        table_close: () => '</table>\n</div>\n</div>',
        table_open: () => '<div class="row"><div class="rowCellTable">\n<table>\n',
      
      } : {};

      MD.renderer.rules = {...MD.renderer.rules, ...rules};

      var result = MD.render(markdown);
      // console.log('result', result);
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
      id="markdown-root-div"
      className={options?.dm ? "slideModeRootDiv" : ""}
      ref={divToRender}
    />
  );
};

// const RootStyles: Record<string, any> = {
//   default: {},
//   slide: {
//     display: "flex",
//     height: "100vh",
//     width: "100vw",
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems: "flex-start",
//   },
// };
