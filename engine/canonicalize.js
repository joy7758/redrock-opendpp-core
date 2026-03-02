function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === "object") {
    const out = {};
    for (const k of Object.keys(value).sort()) {
      out[k] = sortObject(value[k]);
    }
    return out;
  }
  return value;
}

export function canonicalize(obj) {
  // IMPORTANT: do not include proof in the canonical data-to-sign by default
  const { proof, ...rest } = obj ?? {};
  const normalized = sortObject(rest);
  return JSON.stringify(normalized);
}
