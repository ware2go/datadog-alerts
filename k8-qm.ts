
// Cluster No Data
export function queryNoData(environment: string): string {
  return `"datadog.agent.up".over("cluster-name:${environment}-primary").by("*").last(1).pct_by_status()`;
}
export function messageNoData(notify: string): string {
  return `{{#is_alert}}\n\n{{cluster-name.name}} 75% or more of hosts are missing data\n\n{{/is_alert}} \n\n{{#is_warning}}\n\n50% or more of hosts are missing data\n\n{{/is_warning}} \n\n{{#is_no_data_recovery}}\n\nRecovered from No Data\n\n{{/is_no_data_recovery}} ${notify}`;
}

// Cluster ClusterCpuIdle
export function queryClusterCpuIdle(environment: string): string {
  return `avg(last_5m):avg:system.cpu.idle{cluster-name:${environment}-primary} < 10`;
}
export function messageClusterCpuIdle(notify: string): string {
  return `{{#is_alert}}\n\n{{cluster-name.name}} CPU is Idle less than 10%\n\n{{/is_alert}} \n\n{{#is_warning}}\n\nCPU is Idle less than 10%\n\n{{/is_warning}} \n\n{{#is_no_data_recovery}}\n\nRecovered\n\n{{/is_no_data_recovery}} ${notify}`;
}

// Cluster 5 minute load Average
export function queryFiveMinuteLoadAverages(environment: string, critical: string): string {
  return `avg(last_5m):avg:system.load.5{cluster-name:${environment}-primary} > ${critical}`;
}
export function messageFiveMinuteLoadAverages(notify: string, crit: string, warn: string): string {
  return `{{#is_alert}}\n{{cluster-name.name}} has 5 minute load greater than ${crit} \n{{/is_alert}} \n{{#is_warning}}\n{{cluster-name.name}} has 5 minute load average ${warn} \n{{/is_warning}}\n{{#is_recovery}}\n{{cluster-name.name}} recovered.\n{{/is_recovery}} ${notify}`;
}

// Cluster CPU IOWait
export function queryCpuIoWait(environment: string, critical: string): string {
  return `avg(last_5m):avg:system.cpu.iowait{cluster-name:${environment}-primary} by {cluster-name} > ${critical}`;
}
export function messageCpuIoWait(notify: string, critical: string, warning: string): string {
  return `{{#is_alert}}\n{{cluster-name.name}}  System Cpu iowait greater than ${critical} \n{{/is_alert}} \n{{#is_warning}}\n{{cluster-name.name}} System Cpu iowait greater than ${warning} \n{{/is_warning}}\n{{#is_recovery}}\n{{cluster-name.name}} recovered.\n{{/is_recovery}} ${notify}`;
}

// Cluster Kubernetes Pods Expired
export function queryExpiredPods(environment: string, critical: string): string {
  return `avg(last_5m):avg:kubernetes.pods.expired{cluster-name:${environment}-primary} by {cluster-name} > ${critical}`;
}
export function messageExpiredPods(notify: string, critical: string, warning: string): string {
  return `{{#is_alert}}\n{{cluster-name.name}}  Kubernetes Expired Pods ${critical} \n{{/is_alert}} \n{{#is_warning}}\n{{cluster-name.name}} Kubernetes Expired Pods ${warning}\n{{/is_warning}}\n{{#is_recovery}}\n{{cluster-name.name}} recovered.\n{{/is_recovery}} ${notify}`;
}
