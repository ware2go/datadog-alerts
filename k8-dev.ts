import * as datadog from '@pulumi/datadog';

// Cluster Data Monitor

const projectEnv = 'dev';
const groupNotify = '@devops@ware2go.co';

// Cluster No Data
function queryNoData(environment: string): string {
  return `datadog.agent.up.over(cluster-name:${environment}-primary).by(*).last(1).pct_by_status()`;
}
function messageNoData(notify: string): string {
  return `{{#is_alert}}\n\n{{cluster-name.name}} 75% or more of hosts are missing data\n\n{{/is_alert}} \n\n{{#is_warning}}\n\n50% or more of hosts are missing data\n\n{{/is_warning}} \n\n{{#is_no_data_recovery}}\n\nRecovered from No Data\n\n{{/is_no_data_recovery}} ${notify}`;
}

// Cluster Free Space
function queryFreeDiskSpace(environment: string): string {
  return `avg(last_5m):avg:system.disk.free{cluster-name:${environment}-primary by {cluster-name} < 10000000000`;
}
function messageFreeDiskSpace(notify: string): string {
  return `{{#is_alert}}\n{{cluster-name.name}} has less than 10GB of free disk space\n{{/is_alert}} \n{{#is_warning}}\n{{cluster-name.name}} has less than 20GB of free disk space\n{{/is_warning}}\n{{#is_recovery}}\n{{cluster-name.name}} disk space recovered.\n{{/is_recovery}}   ${notify}`;
}


// Monitors
export const devClusterMonitor = new datadog.Monitor(`${projectEnv}NoDataMonitor`, {
  name: '{{cluster-name.name}} is missing Data',
  type: 'service check',
  query: queryNoData(projectEnv),
  message: messageNoData(`${groupNotify}`),
  tags: [projectEnv],
  renotifyInterval: 0,
  timeoutH: 0,
  notifyNoData: true,
  noDataTimeframe: 2,
  notifyAudit: false,
  newHostDelay: 300,
  thresholds: { critical: 75, warning: 50 },
});

export const devClusterCpuMonitor = new datadog.Monitor(`${projectEnv}NoDataMonitor`, {
  name: '{{cluster-name.name}} free disk space',
  type: 'metric alert',
  query: queryFreeDiskSpace(projectEnv),
  message: messageFreeDiskSpace(`${groupNotify}`),
});
