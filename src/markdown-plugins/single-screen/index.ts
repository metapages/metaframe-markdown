import type MarkdownIt from 'markdown-it/lib';
import type StateCore from 'markdown-it/lib/rules_core/state_core';

import { Options } from '../../components/options/useOptions';

type PluginOptions = Pick<Options, "dm" | "h">;
/**
 * An example plugin that adds a color to paragraphs
 */
export default function markdownPluginSingleScreen(
  md: MarkdownIt,
  opts: PluginOptions
): void {
  md.core.ruler.push("single-screen", generateRule(opts));
}

const HeadingTagsCentered: Record<string, boolean> = {
  h1: true,
  h2: true,
  h3: true,
  h4: false,
  h5: false,
  h6: false,
};

const generateRule = (opts: PluginOptions): ((state: StateCore) => boolean) => {
  return (state: StateCore): boolean => {
    for (const [i, token] of state.tokens.entries()) {
      if (opts.dm === "slide") {
        // images are centered
        if (token?.children?.[0]?.type === "image") {
          state.tokens[i - 1].tag = "div";
          state.tokens[i - 1].attrPush(["class", "standalone-image-container"]);
          state.tokens[i + 1].tag = "div";
        }

        // assign css to text
        if (token?.children?.[0]?.type === "text") {
          state.tokens[i - 1].attrPush(["class", "markdown-text"]);
        }
      }

      // h1,h2, h3 headings can have a css class
      if (
        token?.children?.[0]?.type === "text" &&
        HeadingTagsCentered[state.tokens[i - 1].tag || ""] &&
        state.tokens[i - 1].type === "heading_open"
      ) {
        if (opts.h) {
          const classes = opts.h
            .replace(" ", ",")
            .split(",")
            .filter((s) => !!s);
          classes.forEach((c) => state.tokens[i - 1].attrJoin("class", c));
        }
      }
    }
    return true;
  };
};
