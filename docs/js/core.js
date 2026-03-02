async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function sortRecursively(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sortRecursively(item));
  }

  if (value && typeof value === "object") {
    const sorted = {};
    Object.keys(value).sort().forEach((key) => {
      sorted[key] = sortRecursively(value[key]);
    });
    return sorted;
  }

  return value;
}

function canonicalize(obj) {
  return JSON.stringify(sortRecursively(obj));
}

async function generateDPP(data, previousVersionHash = null) {
  const canonical = canonicalize(data);
  const hash = await sha256(canonical);

  return {
    hongyan_object: data,
    proof: {
      canonical,
      hash,
      previous_version_hash: previousVersionHash,
      generated_at: new Date().toISOString(),
      algorithm: "SHA-256"
    }
  };
}

function getPayloadAndHash(obj) {
  if (
    obj &&
    obj.hongyan_object &&
    obj.proof &&
    typeof obj.proof.hash === "string"
  ) {
    return { payload: obj.hongyan_object, hash: obj.proof.hash };
  }

  if (obj && obj.data && typeof obj.hash === "string") {
    return { payload: obj.data, hash: obj.hash };
  }

  return null;
}

async function verifyDPP(obj) {
  const target = getPayloadAndHash(obj);
  if (!target) {
    return false;
  }

  const canonical = canonicalize(target.payload);
  const calculatedHash = await sha256(canonical);
  return calculatedHash === target.hash;
}

window.generateDPP = generateDPP;
window.verifyDPP = verifyDPP;
