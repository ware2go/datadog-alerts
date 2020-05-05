// APM response and error rate for Postgres traces
export function queryPostgresErrorRate(environment: string): string {
  return `sum(last_5m):avg:trace.pg.query.errors{env:${environment}} by {service}.as_count() / avg:trace.pg.query.hits{env:${environment}} by {service}.as_count() > 0.8`;
}
export function messagePostgresErrorRate(notify: string): string {
  return `Service {{service.name}} is experiencing a high error rate reaching Postgres ${notify}`;
}

export function queryPostgresResponseTime(environment: string): string {
  return `sum(last_5m):avg:trace.pg.query.duration{env:${environment}} by {service} > 0.015`;
}
export function messagePostgresResponseTime(notify: string): string {
  return `Postgres response time is high for service {{service.name}} ${notify}`;
}

// APM response and error rate for http traces

export function queryHttpErrorRate(environment: string): string {
  return `sum(last_5m):avg:trace.http.request.errors{env:${environment}} by {service}.as_count() / avg:trace.http.request.hits{env:${environment}} by {service}.as_count() > 2.5`;
}
export function messageHttpErrorRate(notify: string): string {
  return `Service {{service.name}} is experiencing a high error rate with http requests ${notify}`;
}

export function queryHttpResponseTime(environment: string): string {
  return `sum(last_5m):avg:trace.http.request.duration{env:${environment}} by {service} > 5`;
}
export function messageHttpResponseTime(notify: string): string {
  return `HTTP response time is high for service {{service.name}} ${notify}`;
}

// APM response and error rate for express traces

export function queryExpressErrorRate(environment: string): string {
  return `sum(last_5m):avg:trace.express.request.errors{env:${environment}} by {service}.as_count() / avg:trace.express.request.hits{env:dev} by {service}.as_count() > 1.5`;
}
export function messageExpressErrorRate(notify: string): string {
  return `Service {{service.name}} is experiencing a high error rate with Express requests ${notify}`;
}

export function queryExpressResponseTime(environment: string): string {
  return `sum(last_5m):avg:trace.express.request.duration{env:${environment}} by {service} > 2`;
}
export function messageExpressResponseTime(notify: string): string {
  return `Express response time is high for service {{service.name}} ${notify}`;
}
