import * as datadog from '@pulumi/datadog';
import * as ddeventqm from './event-qm';

// Monitors
export const eventKeycloadMonitor = new datadog.Monitor('Keycloak appears to be restarting', {
  name: 'Keycloak appears to be restarting',
  type: 'event alert',
  query: ddeventqm.queryKeyCloak('5m', '1'),
  message: ddeventqm.messageKeyCloak(),
  tags: [],
  renotifyInterval: 0,
  timeoutH: 0,
  notifyNoData: false,
  noDataTimeframe: 2,
  notifyAudit: false,
  newHostDelay: 300,
  thresholds: { critical: 1 },
});
