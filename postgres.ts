import * as datadog from '@pulumi/datadog';

export const postgresDeadlocks = new datadog.Monitor('postgresDeadlocks', {
  name: 'Deadlock occurred on {{db.name}}',
  query: 'max(last_5m):max:postgresql.deadlocks{*} by {db} >= 1',
  type: 'query alert',
  message: 'Deadlock has occurred on {{db.name}}  Please check db health',
});

export const postgresConnectionCount = new datadog.Monitor('postgresConnectionCount', {
  name: 'Connection count anomalous for {{db.name}} database',
  query: 'avg(last_1d):anomalies(max:postgresql.connections{*} by {db}, \'agile\', 2, direction=\'both\', alert_window=\'last_1h\', interval=300, count_default_zero=\'true\', seasonality=\'daily\', timezone=\'america/new_york\') >= 1',
  type: 'query alert',
  message: '{{db.name}} is reporting anomalous activity with a value of {{value}}',
});

export const postgresReplicationLag = new datadog.Monitor('postgresReplicationLag', {
  name: 'Replication on postgres service {{aiven-service.name}} has {{value}} seconds of replication lag',
  query: 'max(last_5m):max:postgresql.replication_delay{*} by {aiven-service} > 3',
  type: 'metric alert',
  message: 'Replication is lagging on {{aiven-service.name}}. The current value is {{value}}, threshold for alert is {{threshold}}',
});