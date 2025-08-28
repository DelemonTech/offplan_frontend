import React from 'react';
import { renderToString } from 'react-dom/server';
import { PageShell } from './PageShell';
import { renderPage } from 'vite-plugin-ssr/server';

export { render };

async function render(pageContext) {
  const appHtml = renderToString(<PageShell pageContext={pageContext} />);
  return renderPage({ ...pageContext, appHtml });
}
