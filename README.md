# 欧盟数字产品护照（DPP）数据对象核心
EU Digital Product Passport Data Object Core

📘 官方规范：  
[红岩 DPP 数据对象规范 v1.0](docs/specification-v1.0.md)

面向中国出口企业与 DPP 服务商的开源合规基础结构。  
RedRock OpenDPP Core

---

本项目是一个面向中国出口企业与 DPP 服务商的  
欧盟数字产品护照（Digital Product Passport, DPP）  
数据对象结构与可验证模型。

## Digital Biosphere Ecosystem

This repository is part of the **Digital Biosphere Architecture**.

Architecture overview:
[digital-biosphere-architecture](https://github.com/joy7758/digital-biosphere-architecture)

适用于：
- 欧盟 DPP 合规开发
- 电池护照（Battery Passport）
- 出口产品合规数据结构设计
- DPP SaaS 系统集成

---

## 你可能正在找这些问题

如果你正在评估“欧盟 DPP 怎么做”，或者要落地“欧盟数字产品护照 数据结构”，  
这个仓库提供可直接集成的对象模型和验证流程，覆盖 DPP 开发、  
电池护照 接口设计，以及欧盟产品护照 技术方案中的数据完整性层。

---

## 核心能力

- 确定性 JSON 规范化（Canonicalization）
- SHA-256 对象哈希
- Ed25519 本地签名
- 离线验签
- 生命周期链式关联

不依赖中心服务器，不强制注册中心，不依赖区块链。

---

## 适用对象

- 出口欧盟的中国制造企业
- 中国 DPP SaaS 服务商
- ERP / MES 厂商
- 合规系统集成商

---

## 典型接入场景

- 工厂条码与追溯系统
- ERP 出口模块
- DPP SaaS 后端
- 供应链数据采集系统

---

## 项目边界

RedRock OpenDPP Core 不是 SaaS 平台，不托管业务数据，不替代合规咨询。  
它是可嵌入、可自托管的数据完整性内核。

---

## 快速开始

```bash
npm run demo
```

---

## 文档导航

- [README.zh-CN.md](README.zh-CN.md)
- [docs/eu-dpp-explained.md](docs/eu-dpp-explained.md)
- [docs/china-export-dpp-guide.md](docs/china-export-dpp-guide.md)
- [docs/faq.md](docs/faq.md)
- [docs/integration.md](docs/integration.md)

---

## 开源协议

Apache-2.0
