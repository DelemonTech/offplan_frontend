import React from 'react';
import ReactDOM from 'react-dom/client';
import { PageShell } from './PageShell';
import { hydratePage } from 'vite-plugin-ssr/client';

hydratePage(PageShell);
