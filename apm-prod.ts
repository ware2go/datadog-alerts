import * as datadog from '@pulumi/datadog';
import * as ddqm from './apm-qm';

const projectEnv = 'prod';
const groupNotify = '@devops@ware2go.co';

// Postgres connection trace metrics
export const prodPostgresErrorRate = new datadog.Monitor(`${projectEnv}PostgresErrorRate`, {
  name: `${projectEnv} Postgres Error rate by {{service.name}}`,
  type: 'query alert',
  query: ddqm.queryPostgresErrorRate(projectEnv),
  message: ddqm.messagePostgresErrorRate(`${groupNotify}`),
  tags: [projectEnv],
  renotifyInterval: 0,
  timeoutH: 0,
  notifyNoData: false,
  notifyAudit: false,
  newHostDelay: 300,
  thresholds: { critical: 0.8 },
});

export const prodPostgresResponseTime = new datadog.Monitor(`${projectEnv}PostgresResponseTime`, {
  name: `${projectEnv} Postgres Response Time High by {{service.name}}`,
  type: 'query alert',
  query: ddqm.queryPostgresResponseTime(projectEnv),
  message: ddqm.messagePostgresResponseTime(`${groupNotify}`),
  tags: [projectEnv],
  renotifyInterval: 0,
  timeoutH: 0,
  notifyNoData: false,
  notifyAudit: false,
  newHostDelay: 300,
  thresholds: { critical: 0.015 },
});

// HTTP request trace metrics

export const prodHttpErrorRate = new datadog.Monitor(`${projectEnv}HttpErrorRate`, {
  name: `${projectEnv} HTTP Error rate by {{service.name}}`,
  type: 'query alert',
  query: ddqm.queryHttpErrorRate(projectEnv),
  message: ddqm.messageHttpErrorRate(`${groupNotify}`),
  tags: [projectEnv],
  renotifyInterval: 0,
  timeoutH: 0,
  notifyNoData: false,
  notifyAudit: false,
  newHostDelay: 300,
  thresholds: { critical: 2.5 },
});

export const prodHttpResponseTime = new datadog.Monitor(`${projectEnv}HttpResponseTime`, {
  name: `${projectEnv} HTTP Response Time High by {{service.name}}`,
  type: 'query alert',
  query: ddqm.queryHttpResponseTime(projectEnv),
  message: ddqm.messageHttpResponseTime(`${groupNotify}`),
  tags: [projectEnv],
  renotifyInterval: 0,
  timeoutH: 0,
  notifyNoData: false,
  notifyAudit: false,
  newHostDelay: 300,
  thresholds: { critical: 5 },
});

// Express request trace metrics

export const prodExpressErrorRate = new datadog.Monitor(`${projectEnv}ExpressErrorRate`, {
  name: `${projectEnv} Express Error rate by {{service.name}}`,
  type: 'query alert',
  query: ddqm.queryExpressErrorRate(projectEnv),
  message: ddqm.messageExpressErrorRate(`${groupNotify}`),
  tags: [projectEnv],
  renotifyInterval: 0,
  timeoutH: 0,
  notifyNoData: false,
  notifyAudit: false,
  newHostDelay: 300,
  thresholds: { critical: 1.5 },
});

export const prodExpressResponseTime = new datadog.Monitor(`${projectEnv}ExpressResponseTime`, {
  name: `${projectEnv} Express Response Time High by {{service.name}}`,
  type: 'query alert',
  query: ddqm.queryExpressResponseTime(projectEnv),
  message: ddqm.messageExpressResponseTime(`${groupNotify}`),
  tags: [projectEnv],
  renotifyInterval: 0,
  timeoutH: 0,
  notifyNoData: false,
  notifyAudit: false,
  newHostDelay: 300,
  thresholds: { critical: 2 },
});
