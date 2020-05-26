export const servicesDefaultYamlStr = `services:
# most basic service
- "https://google.com"

# detailed service definition
- name: example
  type: http
  method: get
  headers:
    x-my-header: my-value
  url: http://example.com
  every: 5s
`;
