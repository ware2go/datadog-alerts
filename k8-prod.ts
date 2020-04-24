import * as datadog from '@pulumi/datadog';

import * as ddqm from './k8-qm';

const projectEnv = 'prod';
const groupNotify = '@devops@ware2go.co @slack-Datadog-2_0_status';


// Monitors
export const prodClusterNoDataMonitor = new datadog.Monitor(`${projectEnv}ClusterNoDataMonitor`, {
  name: `${projectEnv} is missing Data`,
  type: 'service check',
  query: ddqm.queryNoData(projectEnv),
  message: ddqm.messageNoData(`${groupNotify}`),
  tags: [projectEnv],
  renotifyInterval: 0,
  timeoutH: 0,
  notifyNoData: true,
  noDataTimeframe: 2,
  notifyAudit: false,
  newHostDelay: 300,
  thresholds: { critical: 75, warning: 20 },
});

export const prodClusterCpuIdle = new datadog.Monitor(`${projectEnv}ClusterClusterCpuIdle`, {
  name: `${projectEnv} Cpu Idle`,
  type: 'metric alert',
  query: ddqm.queryClusterCpuIdle(projectEnv),
  message: ddqm.messageClusterCpuIdle(`${groupNotify}`),
  tags: [projectEnv],
  thresholds: { critical: 10, warning: 30 },
  notifyNoData: false,
  newHostDelay: 300,
  includeTags: true,
  requireFullWindow: true,
  timeoutH: 0,
});

export const prodClusterFiveMinuteLoadAverage = new datadog.Monitor(`${projectEnv}FiveMinuteLoadAverage`, {
  name: `${projectEnv} Five Minute Load Average`,
  type: 'metric alert',
  query: ddqm.queryFiveMinuteLoadAverages(projectEnv, '6'),
  message: ddqm.messageFiveMinuteLoadAverages(`${groupNotify}`, '6', '5'),
  tags: [projectEnv],
  thresholds: { critical: 6, warning: 5 },
  notifyNoData: false,
  newHostDelay: 300,
  includeTags: true,
  requireFullWindow: true,
  timeoutH: 0,
});

export const prodClusterCpuIoWait = new datadog.Monitor(`${projectEnv}CpuIoWait`, {
  name: `${projectEnv} CpuIoWait`,
  type: 'metric alert',
  query: ddqm.queryCpuIoWait(projectEnv, '0.9'),
  message: ddqm.messageCpuIoWait(`${groupNotify}`, '0.9', '0.7'),
  tags: [projectEnv],
  thresholds: { critical: 0.9, warning: 0.7 },
  notifyNoData: false,
  newHostDelay: 300,
  includeTags: true,
  requireFullWindow: true,
  timeoutH: 0,
});

export const prodClusterExpiredPods = new datadog.Monitor(`${projectEnv}ExpiredPods`, {
  name: `${projectEnv} ExpiredPods`,
  type: 'metric alert',
  query: ddqm.queryExpiredPods(projectEnv, '16'),
  message: ddqm.messageExpiredPods(`${groupNotify}`, '16', '12'),
  tags: [projectEnv],
  thresholds: { critical: 16, warning: 12 },
  notifyNoData: false,
  newHostDelay: 300,
  includeTags: true,
  requireFullWindow: true,
  timeoutH: 0,
});
