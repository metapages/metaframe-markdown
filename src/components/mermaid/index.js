import Mermaid from 'mermaid';

const htmlEntities = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const MermaidChart = (code) => {
  try {
    return `<div class="mermaid" >${code}</div>`;
  } catch (err) {
    return `<pre>${htmlEntities(err.name)}: ${htmlEntities(err.message)}</pre>`;
  }
};

const MermaidPlugIn = (md, opts) => {
  Object.assign(MermaidPlugIn.default, opts);
  const { token: _token = "mermaid", ...dictionary } =
    MermaidPlugIn.default.dictionary;
  // const dictionary = swapObj(_dictionary);
  Mermaid.initialize(MermaidPlugIn.default);

  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);

  function replacer(_, p1, p2, p3) {
    p1 = dictionary[p1] ?? p1;
    p2 = dictionary[p2] ?? p2;
    return p2 === "" ? `${p1}\n` : `${p1} ${p2}${p3}`;
  }

  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info.trim() === _token) {
      return MermaidChart(code.replace(/(.*?)[ \n](.*?)([ \n])/, replacer));
    }
    return defaultRenderer(tokens, idx, opts, env, self);
  };
};

MermaidPlugIn.default = {
  startOnLoad: false,
  securityLevel: "loose",
  theme: "default",
  flowchart: {
    htmlLabels: true,
    useMaxWidth: true,
  },
  dictionary: {
    token: "mermaid",
  },
};

export { MermaidPlugIn };