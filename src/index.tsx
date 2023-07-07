// import "milligram/dist/milligram.min.css";
import 'github-markdown-css/github-markdown.css';

import { render } from 'preact';

import { WithMetaframeAndInputs } from '@metapages/metaframe-hook';

import { App } from './App';

render(
  <WithMetaframeAndInputs>
    <App />
  </WithMetaframeAndInputs>,
  document.getElementById("root")!
);
