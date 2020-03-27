import * as datadog from '@pulumi/datadog';

export const redisReplicationLag = new datadog.Monitor('redisReplicationLag', {
  name: 'Redis replication is behind on {{aiven-service.name}}',
  query: 'avg(last_5m):max:redis.replication.delay{aiven-service-type:redis} by {aiven-service} > 10',
  type: 'metric alert',
  message: 'Replication is lagging on {{aiven-service.name}}',
  requireFullWindow: false,
});

export const redisLatency = new datadog.Monitor('redisLatency', {
  name: 'Redis latency has hit {{value}} ms on host {{host.name}}',
  query: 'max(last_5m):max:redis.info.latency_ms{aiven-service-type:redis} by {host} > 10',
  type: 'metric alert',
  message: 'Latency on redis host has hit {{value}}ms for host {{host.name}}. Threshold for alert is {{threshold}}',
  requireFullWindow: false,
});

export const redisMemFree = new datadog.Monitor('redisMemFree', {
  name: 'Available memory for redis host {{host.name}} is at {{value}}',
  query: 'max(last_5m):max:redis.mem.maxmemory{aiven-service-type:redis} by {host} - max:redis.mem.rss{aiven-service-type:redis} by {host} - max:redis.mem.lua{aiven-service-type:redis} by {host} - max:redis.mem.used{aiven-service-type:redis} by {host} < 100000000',
  type: 'query alert',
  message: 'Check redis host {{host.name}} for high memory usage',
  requireFullWindow: false,
});
