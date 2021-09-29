import { render } from "preact";
import { WithMetaframe } from "@metapages/metaframe-hook";
import { App } from "./App";
// import "milligram/dist/milligram.min.css";
import "github-markdown-css/github-markdown.css"

render(
  <WithMetaframe>
    <App />
  </WithMetaframe>,
  document.getElementById("root")!
);
