# RedRock OpenDPP Core

中文：RedRock OpenDPP Core 是一个面向中国出口企业的欧盟 DPP 合规数据底座。  
English: RedRock OpenDPP Core is a compliance-focused DPP data foundation for China-to-EU export scenarios.

---

## 项目定位 | Positioning

中文：这个项目只做一件事，把产品数据变成“可验证对象”（canonicalize -> hash -> sign -> verify）。  
English: This project focuses on one job: turning product data into a verifiable object.

如果你在做出口合规系统，可以先用它把“数据完整性”这一步稳定下来。  
If you are building export compliance systems, it helps stabilize the data integrity layer first.

---

## 适用对象 | Who This Is For

- 出口欧盟的中国制造企业 / Chinese manufacturers exporting to the EU
- 中国 DPP SaaS 服务商 / Chinese DPP SaaS providers
- ERP / MES 厂商 / ERP and MES vendors
- 合规系统集成商 / Compliance system integrators

---

## 核心能力 | Core Capabilities

- 确定性 JSON 规范化 / Deterministic JSON canonicalization
- SHA-256 对象哈希 / SHA-256 object hashing
- Ed25519 本地签名 / Local Ed25519 signing
- 离线验签 / Offline verification
- 生命周期链式关联 / Lifecycle hash chaining

不依赖中心服务器，不强制注册中心，不依赖区块链。  
No central server, no forced registry, no blockchain dependency.

---

## 典型接入场景 | Typical Integrations

- 工厂条码与追溯系统 / Factory barcode and traceability workflows
- ERP 出口模块 / ERP export modules
- DPP SaaS 后端 / DPP SaaS backends
- 供应链数据采集系统 / Supply-chain data collection systems

---

## 项目边界 | Project Scope

中文：RedRock 不是 SaaS 平台，不托管业务数据，不替代合规咨询。  
English: RedRock is not a SaaS platform, does not host business data, and does not replace compliance consulting.

它是可嵌入、可自托管的数据完整性内核。  
It is an embeddable, self-hosted data integrity core.

---

## 快速开始 | Quick Start

```bash
npm run demo
```

---

## 文档导航 | Documentation

- [README.zh-CN.md](README.zh-CN.md)
- [docs/eu-dpp-explained.md](docs/eu-dpp-explained.md)
- [docs/china-export-dpp-guide.md](docs/china-export-dpp-guide.md)
- [docs/faq.md](docs/faq.md)
- [docs/integration.md](docs/integration.md)

---

## 开源协议 | License

Apache-2.0
