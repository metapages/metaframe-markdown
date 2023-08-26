import { Options } from '/@/hooks/useOptions';
import type MarkdownIt from 'markdown-it/lib';
import type StateCore from 'markdown-it/lib/rules_core/state_core';

type PluginOptions = Pick<Options, "displaymode"> ;
/**
 * An example plugin that adds a color to paragraphs
 */
export default function markdownPluginSingleScreen(md: MarkdownIt, opts:PluginOptions): void {

  md.core.ruler.push("single-screen", generateRule(opts))
}

const generateRule = (opts:PluginOptions) : ((state: StateCore) => boolean) => {

  return (state: StateCore):boolean => {
    if (opts.displaymode !== "slide") {
      return false;
    }
    for (const [i, token] of state.tokens.entries()) {
      if (token?.children?.[0]?.type === "image") {
          state.tokens[i - 1].tag = "div";
          state.tokens[i - 1].attrPush(["class", "container1 centerImage"]);
          state.tokens[i + 1].tag = "div";
          // state.tokens[i + 1].attrPush(["class", "container1 centerImage"]);
          // token.tag = "div"
          token.attrPush(["class", "fill-vertical"]);
      }

      if (token?.children?.[0]?.type === "text") {
        state.tokens[i - 1].attrPush(["class", "markdown-text"]);
        // if (token.tag === "p") {
        //   // token.attrPush(["class", "markdown-text"]);
          
        // }
      }

    }
    return true;
  }
}