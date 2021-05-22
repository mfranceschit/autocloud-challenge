/**
 * @method camelize
 * @param {String} key
 * @returns {String}
 * @description Transform key from snake_case to camel_case
 */
export const camelize = (key: string): string =>
  key.replace(/[\-_\s]+(.)?/g, (_, character) => {
    return character ? character.toUpperCase() : '';
  });
