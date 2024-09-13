import {
  useEffect,
  useRef,
} from 'react';

import md from 'markdown-it';
import markdownAnchor from 'markdown-it-anchor';
import Mermaid from 'mermaid';

import { Box } from '@chakra-ui/react';

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
    if (!markdown || !divToRender?.current) {
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
      divToRender.current!.innerHTML = result;
      Mermaid.run();
    } catch (err) {
      setMarkdown(
        `# Error rendering markdown \n\n - markdown: \`${markdown}\` \n - err: ${err}`
      );
    }
  }, [markdown, divToRender, options]);

  return (
    <Box
      id="markdown-root-div"
      className={options?.dm ? "slideModeRootDiv" : ""}
      ref={divToRender}
      m="1em"
    />
  );
};
