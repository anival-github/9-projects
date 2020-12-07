/**
 * @param {String} el
 * @param {String} classNames
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 * @param  {...array} dataAttr // [['id', 'menu'], ['code', 'value']]
 */

export default function create(el, classNames, child, parent, dataAttr) {
  let element = null;
  try {
    element = document.createElement(el);
  } catch (error) {
    throw new Error('Unable to create HTMLElement! Give a proper tag name');
  }

  if (classNames) element.classList.add(...classNames.split(' ')); // "class1 class2 class3"

  if (child && Array.isArray(child)) {
    child.forEach((childElement) => childElement && element.appendChild(childElement));
  } else if (child && typeof child === 'object') {
    element.appendChild(child);
  } else if (child && typeof child === 'string') {
    element.innerHTML = child;
  }

  if (parent) {
    parent.appendChild(element);
  }

  if (dataAttr) {
    for (let i = 0; i < dataAttr.length; i += 1) {
      const [attrName, attrValue] = dataAttr[i];
      if (attrValue === '') {
        element.setAttribute(attrName, '');
      } else {
        element.setAttribute(attrName, attrValue);
      }
    }
  }

  return element;
}
