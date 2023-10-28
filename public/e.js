export function e(name, attributes, ...children) {
  const elm = document.createElement(name);
  for (let attributeName in attributes) {
    const attributeValue = attributes[attributeName];
    elm.setAttribute(attributeName, attributeValue);
  }
  if (children) children.forEach((e) => elm.appendChild(e));
  return elm;
}

export function t(text) {
  const t = document.createTextNode(text);
  return t;
}
