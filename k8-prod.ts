import * as datadog from '@pulumi/datadog';

import * as ddqm from './k8-qm';

const projectEnv = 'prod';
const groupNotify = '@devops@ware2go.co';


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
  query: ddqm.queryFiveMinuteLoadAverages(projectEnv),
  message: ddqm.messageFiveMinuteLoadAverages(`${groupNotify}`),
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
  query: ddqm.queryCpuIoWait(projectEnv),
  message: ddqm.messageCpuIoWait(`${groupNotify}`),
  tags: [projectEnv],
  thresholds: { critical: 0.7, warning: 0.5 },
  notifyNoData: false,
  newHostDelay: 300,
  includeTags: true,
  requireFullWindow: true,
  timeoutH: 0,
});

export const prodClusterExpiredPods = new datadog.Monitor(`${projectEnv}ExpiredPods`, {
  name: `${projectEnv} ExpiredPods`,
  type: 'metric alert',
  query: ddqm.queryExpiredPods(projectEnv),
  message: ddqm.messageExpiredPods(`${groupNotify}`),
  tags: [projectEnv],
  thresholds: { critical: 15, warning: 10 },
  notifyNoData: false,
  newHostDelay: 300,
  includeTags: true,
  requireFullWindow: true,
  timeoutH: 0,
});
