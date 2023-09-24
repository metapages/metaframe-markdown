import { useCallback } from 'react';

import { useMarkdown } from '/@/hooks/useMarkdown';

import { MetaframeInputMap } from '@metapages/metapage';
import { MetaframeStandaloneComponent } from '@metapages/metapage-embed-react';

export const PanelMarkdownEditor: React.FC = () => {

  const [ markdown, setMarkdown] = useMarkdown();
    
  const onOutputs = useCallback(
    (outputs: MetaframeInputMap) => {
      if (outputs["text"] === undefined || outputs["text"] === null) {
        return;
      }
      setMarkdown(outputs["text"]);
    },
    [setMarkdown]
  );

  return (
    <div>
      <MetaframeStandaloneComponent
        url="https://editor.mtfm.io/#?button=hidden&menuhidden=true&options=JTdCJTIyYXV0b3NlbmQlMjIlM0F0cnVlJTJDJTIybW9kZSUyMiUzQSUyMm1hcmtkb3duJTIyJTJDJTIyc2F2ZWxvYWRpbmhhc2glMjIlM0F0cnVlJTJDJTIydGhlbWUlMjIlM0ElMjJsaWdodCUyMiU3RA=="
        inputs={{ text: markdown}}
        onOutputs={onOutputs}
      />
    </div>
  );
};