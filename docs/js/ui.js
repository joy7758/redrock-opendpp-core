const startDemoBtn = document.getElementById("startDemo");
const demoSection = document.getElementById("demoSection");
const salesModeBtn = document.getElementById("salesMode");
const techModeBtn = document.getElementById("techMode");
const resultArea = document.getElementById("resultArea");
const editorSection = document.getElementById("editorSection");
const chainSection = document.getElementById("chainSection");
const jsonEditor = document.getElementById("jsonEditor");
const verifyBtn = document.getElementById("validateBtn");
const verificationResult = document.getElementById("verificationResult");
const chainList = document.getElementById("chainList");
const newVersionBtn = document.getElementById("newVersionBtn");

let currentMode = "sales";
let currentResult = null;
let versionChain = [];

const salesPreset = {
  productName: "动力电池模组",
  productModel: "RB-BP-240",
  materialSource: "华东供应链",
  carbonData: "32.6"
};

const techPreset = {
  productName: "Battery Pack",
  productModel: "RB-TECH-240",
  materialSource: "CN-EU Material Route",
  carbonData: "28.4"
};

function setInputValue(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.value = value;
  }
}

function applyPreset(preset) {
  setInputValue("productName", preset.productName);
  setInputValue("productModel", preset.productModel);
  setInputValue("materialSource", preset.materialSource);
  setInputValue("carbonData", preset.carbonData);
}

function getFormData() {
  return {
    productName: document.getElementById("productName").value.trim(),
    productModel: document.getElementById("productModel").value.trim(),
    materialSource: document.getElementById("materialSource").value.trim(),
    carbonData: document.getElementById("carbonData").value.trim(),
    version: "1"
  };
}

function formIsEmpty() {
  return [
    "productName",
    "productModel",
    "materialSource",
    "carbonData"
  ].every((id) => !document.getElementById(id).value.trim());
}

function extractHash(obj) {
  if (!obj) {
    return null;
  }
  if (obj.proof && typeof obj.proof.hash === "string") {
    return obj.proof.hash;
  }
  if (typeof obj.hash === "string") {
    return obj.hash;
  }
  return null;
}

function extractPayload(obj) {
  if (!obj) {
    return null;
  }
  if (obj.hongyan_object && typeof obj.hongyan_object === "object") {
    return obj.hongyan_object;
  }
  if (obj.data && typeof obj.data === "object") {
    return obj.data;
  }
  return null;
}

function shortHash(hash) {
  if (!hash || typeof hash !== "string") {
    return "N/A";
  }
  if (hash.length <= 18) {
    return hash;
  }
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

function renderVerification(ok, message) {
  verificationResult.classList.remove("success", "error");
  verificationResult.classList.add(ok ? "success" : "error");
  verificationResult.textContent = message;
}

function renderSummary(obj) {
  if (!obj) {
    resultArea.innerHTML = "<p>尚未生成对象</p>";
    return;
  }

  const payload = extractPayload(obj) || {};
  const proof = obj.proof || {};
  const hash = extractHash(obj) || "N/A";
  const prev = proof.previous_version_hash || "GENESIS";
  const generatedAt = proof.generated_at || "N/A";

  resultArea.innerHTML = [
    `<p><strong>产品：</strong>${payload.productName || "未填写"}</p>`,
    `<p><strong>型号：</strong>${payload.productModel || "未填写"}</p>`,
    `<p><strong>当前哈希：</strong><code>${shortHash(hash)}</code></p>`,
    `<p><strong>前序哈希：</strong><code>${shortHash(prev)}</code></p>`,
    `<p><strong>生成时间：</strong>${generatedAt}</p>`
  ].join("");
}

function renderChain() {
  if (versionChain.length === 0) {
    chainList.textContent = "尚未生成版本";
    return;
  }

  chainList.innerHTML = versionChain
    .map((item, idx) => {
      const hash = extractHash(item) || "N/A";
      const prev = item.proof && item.proof.previous_version_hash
        ? item.proof.previous_version_hash
        : "GENESIS";
      return [
        '<div class="chain-item">',
        `<div>V${idx + 1} · <code>${shortHash(hash)}</code></div>`,
        `<div>prev · <code>${shortHash(prev)}</code></div>`,
        "</div>"
      ].join("");
    })
    .join("");
}

function switchMode(mode) {
  const isSales = mode === "sales";
  currentMode = mode;

  salesModeBtn.classList.toggle("active", isSales);
  techModeBtn.classList.toggle("active", !isSales);

  editorSection.classList.toggle("hidden", isSales);
  chainSection.classList.toggle("hidden", isSales);
  resultArea.classList.toggle("hidden", isSales);
  newVersionBtn.classList.toggle("hidden", isSales);

  if (formIsEmpty()) {
    applyPreset(isSales ? salesPreset : techPreset);
  }

  if (!isSales && currentResult) {
    jsonEditor.value = JSON.stringify(currentResult, null, 2);
  }
}

startDemoBtn.onclick = () => {
  demoSection.classList.remove("hidden");
  applyPreset(salesPreset);
  switchMode("sales");
  demoSection.scrollIntoView({ behavior: "smooth", block: "start" });
};

salesModeBtn.onclick = () => switchMode("sales");
techModeBtn.onclick = () => {
  switchMode("tech");
  document.getElementById("editorSection").classList.remove("hidden");
};

document.getElementById("generateBtn").onclick = async () => {
  const data = getFormData();
  currentResult = await window.generateDPP(data, null);
  versionChain = [currentResult];

  const valid = await window.verifyDPP(currentResult);
  renderVerification(valid, valid ? "验证通过" : "验证失败");
  renderSummary(currentResult);
  renderChain();

  jsonEditor.value = JSON.stringify(currentResult, null, 2);
};

verifyBtn.onclick = async () => {
  try {
    const text = jsonEditor.value.trim();
    const obj = JSON.parse(text);
    const valid = await window.verifyDPP(obj);

    renderVerification(valid, valid ? "验证通过" : "验证失败");

    if (valid) {
      currentResult = obj;
      if (versionChain.length === 0) {
        versionChain = [obj];
      }
      renderSummary(currentResult);
      renderChain();
    }
  } catch (err) {
    renderVerification(false, "JSON 格式错误");
  }
};

newVersionBtn.onclick = async () => {
  if (!currentResult) {
    renderVerification(false, "请先生成一个对象");
    return;
  }

  const payload = extractPayload(currentResult);
  const prevHash = extractHash(currentResult);

  if (!payload || !prevHash) {
    renderVerification(false, "当前对象缺少可用哈希");
    return;
  }

  const newData = {
    ...payload,
    carbonData: `${payload.carbonData || ""} (updated)`,
    version: String(versionChain.length + 1)
  };

  const newObj = await window.generateDPP(newData, prevHash);
  currentResult = newObj;
  versionChain.push(newObj);

  const valid = await window.verifyDPP(newObj);
  renderVerification(valid, valid ? "验证通过" : "验证失败");
  renderSummary(newObj);
  renderChain();

  jsonEditor.value = JSON.stringify(newObj, null, 2);

  if (currentMode === "sales") {
    switchMode("tech");
  }
};
