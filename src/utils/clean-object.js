export function cleanObject(obj, values) {
  for (let key in obj) {
    if (
      values?.includes(obj[key]) ||
      obj[key] === null ||
      obj[key] === undefined ||
      obj[key] === ""
    ) {
      delete obj[key];
    }
  }
  return obj;
}
