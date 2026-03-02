# 红岩 DPP 数据对象规范 v1.0

版本号：hongyan-dpp-1.0  
发布日期：2024  
状态：正式发布  

---

## 一、规范目的

本规范定义“红岩 DPP 数据对象”的基础结构，用于：

- 欧盟数字产品护照（Digital Product Passport, DPP）
- 电池护照（Battery Passport）
- 中国出口企业合规数据结构设计
- DPP SaaS 系统集成

本规范目标：

- 提供可验证的数据对象模型
- 支持生命周期演化记录
- 不依赖区块链
- 不依赖中心服务器
- 可嵌入现有 ERP / SaaS 系统

---

## 二、数据对象结构

一个标准红岩数据对象包含两个部分：

```
{
"hongyan_object": { ... },
"proof": { ... }
}
```

---

### 2.1 hongyan_object（业务数据部分）

必选字段：

- product_name
- model
- material_source
- carbon_data
- version
- previous_version_hash（可为空）

示例：

```
{
"hongyan_object": {
"product_name": "锂电池",
"model": "LFP-2024",
"material_source": "中国",
"carbon_data": "12.5kg CO2",
"version": "1.0",
"previous_version_hash": null
},
"proof": {
"algorithm": "SHA-256",
"hash": "xxxx",
"generated_at": "2024-01-01T00:00:00Z"
}
}
```

---

## 三、生命周期机制

红岩数据对象支持版本演化。

规则：

- 每次生成新版本时
- previous_version_hash = 上一版本 proof.hash

形成不可篡改的版本链条。

---

## 四、验证算法

验证步骤：

1. 对 hongyan_object 进行 canonicalize（按字段排序）
2. 执行 SHA-256
3. 与 proof.hash 比较

如果一致，则验证通过。

---

## 五、兼容性声明

- 本规范为开源结构标准
- 任意组织可独立实现生成与验证逻辑
- 不依赖红岩官方服务器
- 不依赖区块链网络

---

## 六、版本策略

当前版本：

hongyan-dpp-1.0

未来版本将保持向后兼容。

---

## 七、授权声明

红岩 DPP 数据对象规范采用开源协议发布。

允许商业使用与二次开发。
