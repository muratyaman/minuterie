import YAML from 'js-yaml';

export function yamlParse(yamlStr) {
  let result = null;
  try {
    result = YAML.safeLoad(yamlStr);
    console.log('yaml obj', result);
  } catch (err) {
    console.error('yamlParse error', err);
  }
  return result;
}

export function yamlToJson(yamlStr) {
  const yamlDoc = yamlParse(yamlStr);
  return yamlDoc ? JSON.stringify(yamlDoc) : null;
}
