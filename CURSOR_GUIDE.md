# Cursor AI Development Guide

## Project Information

- **Project:** AI Agent Trading Frontend
- **Location:** `/Users/steven/.openclaw/workspace/AI-Agent`
- **Stack:** Next.js 14 + TypeScript + TailwindCSS

## Open This Project in Cursor

1. Open Cursor
2. Click `File` -> `Open Folder`
3. Select `/Users/steven/.openclaw/workspace/AI-Agent`

## Cursor AI Features

### 1) AI Chat (`Cmd+L`)

Use for requirement discussion, debugging, and implementation planning.

Example:

```text
Me: Add an Agent detail page with full profile information.
AI: Sure. I will create a page including ...
```

### 2) AI Code Edit (`Cmd+K`)

Use for transforming selected code blocks.

Example:

```text
Select a function -> Cmd+K -> "Add error handling"
```

### 3) Inline AI Edit (`Cmd+I`)

Use for direct in-place code updates.

Example:

```text
Select code -> Cmd+I -> "Optimize this function performance"
```

## Current Project Status

### Completed

- Initial project scaffold
- Main dashboard page
- Responsive layout
- Mobile adaptation
- Core UI components

### Planned

- Real API integration
- Agent detail page
- Trade detail modal
- Real-time push (WebSocket or SSE)
- Data export
- Dark mode

## Suggested Tasks

### Task 1: Integrate Real API

Target file: `src/app/page.tsx`

- Replace mock data with API calls
- Use `useEffect` to fetch data
- Add loading state
- Add error handling

### Task 2: Create Agent Detail Page

Target file: `src/app/agents/[id]/page.tsx`

- Show basic profile (ID, reputation, rank)
- Show trade history
- Show strategy usage stats
- Show social feedback

### Task 3: Add Trade Detail Modal

Target file: `src/components/TradeModal.tsx`

- Open detail modal on trade row click
- Show promise vs delivery
- Show fraud detection result
- Show review content

### Task 4: Add Real-Time Data Updates

- Real-time metrics updates
- New trade notifications
- Fraud alerts

## Useful Snippets

### New Component Template

```typescript
'use client';

export default function MyComponent() {
  return <div className="p-4">{/* Content */}</div>;
}
```

### Fetch Hook Template

```typescript
import { useEffect, useState } from 'react';

export function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
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

## Git Workflow

```bash
cd /Users/steven/.openclaw/workspace/AI-Agent
git status
git add .
git commit -m "Describe your changes"
git push -u origin main
```

## References

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react)
