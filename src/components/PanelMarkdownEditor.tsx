import { useCallback } from 'react';

import { useMarkdown } from '/@/hooks/useMarkdown';

import { MetaframeInputMap } from '@metapages/metapage';
import { MetaframeStandaloneComponent } from '@metapages/metapage-embed-react';

export const PanelMarkdownEditor: React.FC = () => {

  const [ markdown, setMarkdown] = useMarkdown();
    
  const onOutputs = useCallback(
    (outputs: MetaframeInputMap) => {
      if (outputs["value"] === undefined || outputs["value"] === null) {
        return;
      }
      setMarkdown(outputs["value"]);
    },
    [setMarkdown]
  );

  return (
    <div>
      <MetaframeStandaloneComponent
        url="https://editor.mtfm.io/#?options=eyJhdXRvc2VuZCI6ZmFsc2UsImhpZGVtZW51aWZpZnJhbWUiOnRydWUsIm1vZGUiOiJqc29uIiwidGhlbWUiOiJsaWdodCJ9"
        inputs={{ value: markdown}}
        onOutputs={onOutputs}
      />
    </div>
  );
};