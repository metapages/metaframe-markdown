import 'github-markdown-css/github-markdown.css';

import { StrictMode } from 'react';

import { App } from '/@/App';
import { theme } from '/@/theme';
import { createRoot } from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';
import { WithMetaframeAndInputs } from '@metapages/metaframe-hook';

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <WithMetaframeAndInputs>
        <App />
      </WithMetaframeAndInputs>
    </ChakraProvider>
  </StrictMode>
);
