// Event KeyCloak
export function queryKeyCloak(time: string, events: string): string {
  return `events('priority:all keycloak die status:warning status:error sources:docker').rollup('count').last('${time}') >= ${events}`;
}
export function messageKeyCloak(): string {
  return '{{#is_alert}}\n {{event.host.name}} \n@slack-Datadog-2_0_status \n{{/is_alert}}';
}
