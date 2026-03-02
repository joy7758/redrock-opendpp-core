async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function canonicalize(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}

async function generateDPP(data) {
  const canonical = canonicalize(data);
  const hash = await sha256(canonical);
  return {
    data,
    hash,
    verified: true
  };
}

window.generateDPP = generateDPP;
