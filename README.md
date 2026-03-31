# AI Agent Trading Lab

A Next.js 14 + TypeScript + TailwindCSS dashboard for monitoring AI Agent trading experiments.

## 🚀 Features

- ✅ Real-time monitoring (Total Agents, Active, Trades, Fraud Detection)
- ✅ Agent ranking system (Top 5 + High Risk Agents)
- ✅ Strategy distribution visualization (Normal/Fraud/PUA/Cooperation)
- ✅ Reputation score distribution charts
- ✅ Recent trade history
- ✅ Responsive design, perfect for mobile devices
- ✅ Clean and modern UI design

## 📦 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Charts:** Recharts (optional)
- **Icons:** Lucide React

## 🛠️ Installation & Running

### 1. Install Dependencies

```bash
cd AI-Agent
npm install
```

### 2. Development Mode

```bash
npm run dev
```

Visit http://localhost:3000

### 3. Production Build

```bash
npm run build
npm start
```

## 📱 Page Structure

```
AI-Agent/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout
│       ├── page.tsx        # Main page (Dashboard)
│       └── globals.css     # Global styles
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎨 Design Features

### Color Scheme
- **Primary:** #3B82F6 (Blue)
- **Success:** #10B981 (Green)
- **Warning:** #F59E0B (Yellow)
- **Danger:** #EF4444 (Red)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Optimizations
- Hamburger menu
- Card-based layout
- Touch-friendly button sizes
- Optimized table display

## 📊 Monitoring Metrics

### Core Metrics
- Total Agents
- Active Today
- Completed Trades
- Fraud Detected

### Ranking System
- Top 5 Agents (by tasks completed)
- High Risk Agents (fraud records)

### Distribution Stats
- Strategy Distribution (Normal/Fraud/PUA/Cooperation)
- Reputation Score Distribution (4 ranges)

## 🔌 API Integration (TODO)

Currently using mock data, can be connected to real API later:

```typescript
// API Endpoints Examples
GET /api/stats          # Get statistics
GET /api/rankings       # Get rankings
GET /api/trades         # Get trade records
GET /api/agents/:id     # Get Agent details
```

## 🚧 Next Steps

- [ ] Connect to real API data
- [ ] Add real-time WebSocket updates
- [ ] Implement Agent detail page
- [ ] Add trade detail modal
- [ ] Implement data export feature
- [ ] Add dark mode

## 📝 Development Notes

### Developing with Cursor

1. Open project folder in Cursor
2. Press `Cmd+L` to open AI chat
3. Describe the feature you want to implement
4. AI will help you generate code

### Common Cursor Shortcuts

- `Cmd+K` - AI code generation
- `Cmd+L` - AI chat
- `Cmd+I` - AI inline edit
- `Cmd+'` - Toggle AI panel

## 📄 License

MIT

---

**Version:** v1.0  
**Created:** 2026-03-31  
**Author:** AI Assistant
