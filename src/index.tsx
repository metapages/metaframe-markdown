import { render } from "preact";
import { WithMetaframeAndInputs } from "@metapages/metaframe-hook";
import { App } from "./App";
// import "milligram/dist/milligram.min.css";
import "github-markdown-css/github-markdown.css";

render(
  <WithMetaframeAndInputs>
    <App />
  </WithMetaframeAndInputs>,
  document.getElementById("root")!
);
