import ReactDOMServer from "react-dom/server";

export function renderToDom(node: React.ReactElement) {
  const html = ReactDOMServer.renderToStaticMarkup(node);
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.firstChild as HTMLElement;
}
