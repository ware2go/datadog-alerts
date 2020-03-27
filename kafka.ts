import * as datadog from '@pulumi/datadog';

export const kafkaResponseTime = new datadog.Monitor('kafkaResponseTime', {
    name: 'Kafka host {{aiven-service.name}} response time is {{value}}',
    query: 'max(last_5m):max:kafka.request.produce.time.avg{aiven-service-type:kafka} by {aiven-service} > 15',
    type: 'metric alert',
    message: 'Kafka host {{aiven-service.name}} response time is {{value}} . The threshold for alerting is {{threshold}}',
    requireFullWindow: false,
  });

  export const kafkaRequestFailures = new datadog.Monitor('kafkaRequestFailures', {
    name: 'Kafka failure rate is increasing. {{value}}',
    query: 'max(last_5m):max:kafka.request.produce.failed.rate{aiven-service-type:kafka} by {host} > 2',
    type: 'metric alert',
    message: 'Kafka host {{host.name}}  has had {{value}} requests fail in the last 5 minutes',
    requireFullWindow: false,
  });

  export const kafkaReplicationLag = new datadog.Monitor('kafkaReplicationLag', {
    name: 'Kafka replication is runnning {{value}}ms behind on {{host.name}}',
    query: 'max(last_5m):max:kafka.replication.max_lag{aiven-service-type:kafka} by {host} > 5',
    type: 'metric alert',
    message: 'Kafka replication is runnning {{value}}ms behind on {{host.name}} . The threshold for alert is {{threshold}}',
    requireFullWindow: false,
  });