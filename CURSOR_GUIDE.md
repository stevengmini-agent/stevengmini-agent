# Cursor AI 开发指南

## 项目信息

- **项目名：** AI Agent 交易实验前端
- **位置：** `/Users/steven/.openclaw/workspace/AI-Agent`
- **技术栈：** Next.js 14 + TypeScript + TailwindCSS

## 用 Cursor 打开项目

1. 打开 Cursor
2. `File` → `Open Folder`
3. 选择 `/Users/steven/.openclaw/workspace/AI-Agent`

## Cursor AI 功能

### 1. AI 聊天 (Cmd+L)

**用途：** 和 AI 讨论需求、询问问题、获取建议

**示例对话：**
```
我：帮我添加一个 Agent 详情页面，显示单个 Agent 的完整信息
AI：好的，我会创建一个详情页，包含...
```

### 2. AI 代码生成 (Cmd+K)

**用途：** 选中代码区域，让 AI 生成或修改代码

**示例：**
```
选中一个函数 → Cmd+K → "添加错误处理"
```

### 3. AI 行内编辑 (Cmd+I)

**用途：** 直接在代码中让 AI 修改

**示例：**
```
选中代码 → Cmd+I → "优化这个函数的性能"
```

## 当前项目状态

✅ 已完成：
- 项目框架搭建
- 主页面仪表板
- 响应式设计
- 移动端适配
- 核心组件（StatCard、AgentCard 等）

⏳ 待开发：
- API 数据接入
- Agent 详情页面
- 交易详情弹窗
- 实时 WebSocket 推送
- 数据导出功能
- 暗黑模式

## 开发任务

### 任务 1：接入真实 API

**文件：** `src/app/page.tsx`

**需求：**
- 将 mockData 替换为真实 API 调用
- 使用 useEffect 获取数据
- 添加加载状态
- 添加错误处理

**示例代码：**
```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);

if (loading) return <Loading />;
```

---

### 任务 2：创建 Agent 详情页面

**文件：** `src/app/agents/[id]/page.tsx`

**需求：**
- 显示 Agent 基本信息（ID、信誉分、排名）
- 显示交易历史
- 显示策略使用统计
- 显示社会评价

**页面结构：**
```
Agent 详情
├── 基本信息卡片
│   ├── ID
│   ├── 信誉分
│   ├── 排名
│   └── 任务完成数
├── 交易历史表格
├── 策略使用饼图
└── 社会评价列表
```

---

### 任务 3：添加交易详情弹窗

**文件：** `src/components/TradeModal.tsx`

**需求：**
- 点击交易记录显示详情
- 显示双方承诺 vs 实际交付
- 显示是否欺诈
- 显示评价内容

---

### 任务 4：实时数据推送

**技术：** WebSocket 或 Server-Sent Events

**需求：**
- 实时更新统计数据
- 新交易通知
- 欺诈检测告警

---

## 常用代码片段

### 添加新组件

```typescript
// src/components/MyComponent.tsx
'use client';

export default function MyComponent() {
  return (
    <div className="p-4">
      {/* 内容 */}
    </div>
  );
}
```

### API 调用 Hook

```typescript
// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

export function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

### 响应式布局

```typescript
// 移动端优先
<div className="
  grid 
  grid-cols-1      /* 手机：1 列 */
  md:grid-cols-2   /* 平板：2 列 */
  lg:grid-cols-4   /* 桌面：4 列 */
">
  {/* 内容 */}
</div>
```

## Git 工作流

### 提交代码

```bash
cd /Users/steven/.openclaw/workspace/AI-Agent

# 查看改动
git status

# 添加文件
git add .

# 提交
git commit -m "描述你的改动"

# 推送到 GitHub（需要配置远程）
git remote add origin https://github.com/steven-gemmi/AI-Agent.git
git push -u origin main
```

### 配置 Git 用户

```bash
git config --global user.name "steven-gemmi"
git config --global user.email "your-email@example.com"
```

## 调试技巧

### 1. 查看控制台日志

打开浏览器开发者工具 → Console

### 2. React DevTools

安装 React DevTools 浏览器扩展

### 3. TailwindCSS 调试

添加 `debug-screens` 插件显示当前断点

### 4. Cursor AI 调试

选中错误代码 → Cmd+L → "帮我修复这个错误"

## 性能优化建议

1. **图片优化：** 使用 Next.js Image 组件
2. **代码分割：** 使用动态导入
3. **缓存策略：** 使用 SWR 或 React Query
4. **懒加载：** 组件按需加载

## 安全问题

⚠️ **重要：**
- 不要在代码中硬编码 API Token
- 使用环境变量存储敏感信息
- 启用 CORS 限制
- 实现用户认证

## 资源链接

- [Next.js 文档](https://nextjs.org/docs)
- [TailwindCSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [Lucide React 图标](https://lucide.dev/guide/packages/lucide-react)

---

**有问题随时问 Cursor 的 AI！** 🚀

按 `Cmd+L` 打开聊天，描述你的需求即可。
