# AI Agent 交易实验前端

基于 Next.js 14 + TypeScript + TailwindCSS 构建的 AI Agent 交易实验监控仪表板。

## 🚀 功能特性

- ✅ 实时数据监控（总 Agent 数、活跃数、交易数、欺诈检测）
- ✅ Agent 排名系统（Top 5 + 高风险 Agent）
- ✅ 策略分布可视化（正常/欺诈/PUA/合作）
- ✅ 信誉分分布图表
- ✅ 最近交易记录
- ✅ 响应式设计，完美适配手机端
- ✅ 简约大方的 UI 设计

## 📦 技术栈

- **框架：** Next.js 14
- **语言：** TypeScript
- **样式：** TailwindCSS
- **图表：** Recharts（可选）
- **图标：** Lucide React

## 🛠️ 安装和运行

### 1. 安装依赖

```bash
cd AI-Agent
npm install
```

### 2. 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 3. 生产构建

```bash
npm run build
npm start
```

## 📱 页面结构

```
AI-Agent/
├── src/
│   └── app/
│       ├── layout.tsx      # 根布局
│       ├── page.tsx        # 主页面（仪表板）
│       └── globals.css     # 全局样式
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎨 设计特点

### 配色方案
- **主色：** #3B82F6 (蓝色)
- **成功：** #10B981 (绿色)
- **警告：** #F59E0B (黄色)
- **危险：** #EF4444 (红色)

### 响应式断点
- 手机：< 768px
- 平板：768px - 1024px
- 桌面：> 1024px

### 移动端优化
- 汉堡菜单
- 卡片式布局
- 触摸友好的按钮大小
- 优化的表格显示

## 📊 监控指标

### 核心指标
- 总 Agent 数
- 今日活跃数
- 已完成交易数
- 欺诈检测数

### 排名系统
- Top 5 Agent（任务完成数排序）
- 高风险 Agent（欺诈记录）

### 分布统计
- 策略分布（正常/欺诈/PUA/合作）
- 信誉分分布（4 个区间）

## 🔌 API 集成（待实现）

当前使用模拟数据，后续可接入真实 API：

```typescript
// API 端点示例
GET /api/stats          # 获取统计数据
GET /api/rankings       # 获取排名
GET /api/trades         # 获取交易记录
GET /api/agents/:id     # 获取 Agent 详情
```

## 🚧 下一步

- [ ] 接入真实 API 数据
- [ ] 添加实时 WebSocket 推送
- [ ] 实现 Agent 详情页面
- [ ] 添加交易详情弹窗
- [ ] 实现数据导出功能
- [ ] 添加暗黑模式

## 📝 开发说明

### 使用 Cursor 开发

1. 用 Cursor 打开项目文件夹
2. 按 `Cmd+L` 打开 AI 聊天
3. 描述你想实现的功能
4. AI 会帮你生成代码

### 常用 Cursor 快捷键

- `Cmd+K` - AI 代码生成
- `Cmd+L` - AI 聊天
- `Cmd+I` - AI 行内编辑
- `Cmd+'` - 切换 AI 面板

## 📄 许可证

MIT

---

**版本：** v1.0  
**创建时间：** 2026-03-31  
**作者：** AI Assistant
