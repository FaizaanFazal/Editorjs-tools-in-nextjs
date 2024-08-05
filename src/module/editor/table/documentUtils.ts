/**
 * Checks if the item is not missed or messed
 * @param elem - element
 * @returns true if the element is correct
 * @private
 */
function _isNotMissed(elem: any): boolean {
  return !(elem === undefined || elem === null);
}

/**
 * Create DOM element with set parameters
 * @param tagName - HTML tag of the element to be created
 * @param cssClasses - CSS classes that must be applied to an element
 * @param attrs - Attributes that must be applied to the element
 * @param children - Child elements of the created element
 * @returns the new element
 */
export function create(
  tagName: string,
  cssClasses: string[] | null = null,
  attrs: { [key: string]: string } | null = null,
  children: HTMLElement[] | null = null
): HTMLElement {
  const elem = document.createElement(tagName);

  if (_isNotMissed(cssClasses)) {
    cssClasses?.forEach(cssClass => {
      if (_isNotMissed(cssClass)) {
        elem.classList.add(cssClass);
      }
    });
  }

  if (_isNotMissed(attrs)) {
    Object.keys(attrs!).forEach(key => {
      const value = attrs![key];
      if (_isNotMissed(value)) {
        elem.setAttribute(key, value);
      }
    });
  }

  if (_isNotMissed(children)) {
    children?.forEach(child => {
      if (_isNotMissed(child)) {
        elem.appendChild(child);
      }
    });
  }

  return elem;
}
