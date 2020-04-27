import * as datadog from '@pulumi/datadog';

// Synthetic Browser
export const devVpnUI = new datadog.SyntheticsTest('devvpn', {
  type: 'browser',
  locations: ['aws:eu-central-1'],
  deviceIds: ['laptop_large'],
  request: {
    method: 'GET',
    url: 'https://dev-aws.vpn.tryware2go.com/login',
  },
  name: 'Dev AWS VPN',
  message: 'Notify @slack-devops',
  status: 'live',
  tags: ['env:dev'],
});
