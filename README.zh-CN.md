# RedRock OpenDPP Core

RedRock OpenDPP Core 是面向中国出口企业的欧盟数字产品护照（DPP）合规数据底座。  
English: A compliance-focused DPP data foundation for China-to-EU export scenarios.

---

## 项目定位 | Positioning

这个项目只做一件事：把产品数据转换成可验证对象（canonicalize -> hash -> sign -> verify）。  
English: It turns product data into verifiable objects.

如果你在做出口合规系统，这个仓库可以先帮你把“数据完整性”这一层做好。  
English: If you are building export compliance systems, this helps stabilize your data integrity layer first.

---

## 目标市场 | Target Users

- 出口欧盟的中国制造企业
- 中国 DPP SaaS 服务商
- 服务出口行业的 ERP / MES 厂商
- 合规系统集成商

---

## 项目背景 | Why It Matters

在欧盟《可持续产品生态设计法规（ESPR）》框架下，数字产品护照（DPP）正在成为强制性要求。

中国出口企业需要提供：

- 结构化产品数据
- 可追溯生命周期信息
- 可验证的数据完整性证明

RedRock 提供实现这些要求所需的最小加密数据底座。  
English: RedRock provides the minimum cryptographic foundation needed for this requirement.

---

## RedRock 提供的能力 | Core Capabilities

- 确定性 JSON 规范化
- SHA-256 数据哈希
- Ed25519 本地签名
- 离线验签机制
- 生命周期链式结构

不依赖中心服务器  
不强制注册中心  
不依赖区块链  

---

## 典型应用场景 | Typical Integrations

- 工厂条码生成系统
- ERP 出口模块
- DPP SaaS 平台底层引擎
- 供应链数据采集系统

---

## 技术定位 | Project Scope

RedRock 不是一个 SaaS 平台。

它是一个可嵌入的 DPP 数据完整性内核，供中国合规系统集成。

---

## 文档入口 | Documentation

- [README.md](README.md)
- [docs/eu-dpp-explained.md](docs/eu-dpp-explained.md)
- [docs/china-export-dpp-guide.md](docs/china-export-dpp-guide.md)
- [docs/faq.md](docs/faq.md)
- [docs/integration.md](docs/integration.md)

---

## 开源协议 | License

Apache-2.0
