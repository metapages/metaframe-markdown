import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useMarkdown } from '/@/hooks/useMarkdown';
import debounce from 'debounce';

import { MetaframeInputMap } from '@metapages/metapage';
import { MetaframeStandaloneComponent } from '@metapages/metapage-embed-react';

export const PanelMarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useMarkdown();
  const setOnce = useRef<boolean>(false);
  const [localText, setLocalText] = useState<string>("");

  const debouncedSetMarkdown = useCallback(debounce(setMarkdown, 200), [setMarkdown]);

  useEffect(() => {
    if (setOnce.current) {
      return;
    }
    if (!markdown) {
      return;
    }
    setOnce.current = true;
    setLocalText(markdown);
  }, [markdown]);

  const onOutputs = useCallback(
    (outputs: MetaframeInputMap) => {
      if (outputs["text"] === undefined || outputs["text"] === null) {
        return;
      }
      setLocalText(outputs["text"]);
      debouncedSetMarkdown(outputs["text"]);
    },
    [debouncedSetMarkdown]
  );

  return (
    <div>
      <MetaframeStandaloneComponent
        url="https://editor.mtfm.io/#?hm=disabled&options=JTdCJTIyYXV0b3NlbmQlMjIlM0F0cnVlJTJDJTIybW9kZSUyMiUzQSUyMm1hcmtkb3duJTIyJTJDJTIydGhlbWUlMjIlM0ElMjJ2cy1kYXJrJTIyJTdE"
        inputs={{ text: localText }}
        onOutputs={onOutputs}
      />
    </div>
  );
};
