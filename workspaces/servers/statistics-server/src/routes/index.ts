import { Hono } from 'hono';
import { canExperiment } from 'hono-server';
import { significanceHandler, significanceMiddleware } from './significance-handler';
import { chartDataHandler, chartDataMiddleware } from './chart-data-handler';
import { experimentsMonitorHandler, experimentsMonitorMiddleware } from './experiments-monitor';
import { currenciesHandler } from './currencies-handler';

export const statisticsRouter = new Hono();
statisticsRouter
  .get('/monitor', experimentsMonitorMiddleware, experimentsMonitorHandler)
  .basePath('/:experimentId')
  .use(canExperiment)
  .get('/statistics', significanceMiddleware, significanceHandler)
  .get('/chart-data', chartDataMiddleware, chartDataHandler)
  .get('/currencies', currenciesHandler);
