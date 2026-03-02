const startDemoBtn = document.getElementById("startDemo");
const demoSection = document.getElementById("demoSection");
const salesModeBtn = document.getElementById("salesMode");
const techModeBtn = document.getElementById("techMode");
const resultArea = document.getElementById("resultArea");

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

function switchMode(mode) {
  const isSales = mode === "sales";
  salesModeBtn.classList.toggle("active", isSales);
  techModeBtn.classList.toggle("active", !isSales);
  applyPreset(isSales ? salesPreset : techPreset);
}

startDemoBtn.onclick = () => {
  demoSection.classList.remove("hidden");
  switchMode("sales");
  demoSection.scrollIntoView({ behavior: "smooth", block: "start" });
};

salesModeBtn.onclick = () => switchMode("sales");
techModeBtn.onclick = () => switchMode("tech");

document.getElementById("generateBtn").onclick = async () => {
  const data = {
    productName: document.getElementById("productName").value.trim(),
    productModel: document.getElementById("productModel").value.trim(),
    materialSource: document.getElementById("materialSource").value.trim(),
    carbonData: document.getElementById("carbonData").value.trim(),
    version: "1.0"
  };

  const result = await window.generateDPP(data);
  resultArea.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
};
