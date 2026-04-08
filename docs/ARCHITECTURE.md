# 🏗️ Architecture Guide

## Overview

This document explains the architectural decisions and patterns used in this Crypto Dashboard application.

---

## 📁 Directory Structure

### `/app` - Next.js App Router

```
app/
├── dashboard/
│   ├── layout.tsx          # Dashboard shell with sidebar & topbar
│   ├── page.tsx            # Overview page
│   └── analytics/
│       └── page.tsx        # Analytics page
├── layout.tsx              # Root layout
├── page.tsx                # Home (redirects to dashboard)
└── globals.css             # Global styles & design tokens
```

**Purpose:** Pages and routes following Next.js 14 App Router conventions.

---

### `/components` - React Components

```
components/
├── layout/                 # Layout components (Sidebar, Topbar)
├── ui/                     # Primitive components (Button, Card, etc.)
├── charts/                 # Chart components
└── dashboard/              # Feature-specific components
```

**Hierarchy:**

1. **layout/** - Shell components (used once per layout)
2. **ui/** - Primitive, reusable building blocks
3. **charts/** - Data visualization components
4. **dashboard/** - Feature-specific, composed components

**Pattern:** Components should be small (<150 lines), single-purpose, and composable.

---

### `/types` - TypeScript Definitions

```
types/
├── dashboard.ts            # Dashboard-related types
└── index.ts                # Central type exports
```

**Rules:**

- All interfaces/types live here
- Organized by feature/domain
- Exported through index.ts
- Use `type` keyword for type aliases, `interface` for object shapes

**Example:**

```typescript
import type {Metric, Transaction} from '@/types';
```

---

### `/data` - Mock Data

```
data/
├── dashboard-data.ts       # Dashboard mock data
└── analytics-data.ts       # Analytics mock data
```

**Purpose:** Temporary mock data for development/testing.

**Migration Path:**

```typescript
// Phase 1: Mock data (current)
import {mockMetrics} from '@/data/dashboard-data';

// Phase 2: API integration (future)
import {useDashboardMetrics} from '@/lib/hooks/use-dashboard-data';
const {data: metrics, loading, error} = useDashboardMetrics();
```

---

### `/lib` - Business Logic

```
lib/
├── utils/                  # Pure utility functions
│   ├── format.ts          # Formatting helpers
│   ├── cn.ts              # Class name utility
│   └── index.ts           # Exports
├── hooks/                  # Custom React hooks
└── constants/              # Application constants
    └── nav.ts             # Navigation items
```

**Guidelines:**

- **utils/** - Pure functions, no React/side effects
- **hooks/** - React hooks for stateful logic
- **constants/** - Read-only data that doesn't change

---

### `/config` - Configuration

```
config/
├── app.ts                  # App-wide settings
└── dashboard.ts            # Dashboard configuration
```

**Purpose:** Centralized configuration for:

- Environment variables
- Feature flags
- App constants
- Theme settings

**Usage:**

```typescript
import {appConfig} from '@/config/app';
import {dashboardConfig} from '@/config/dashboard';
```

---

## 🎨 Design System

### Color System

Using CSS custom properties for theming:

```css
:root {
    --background: 0 0% 100%;
    --foreground: 0 0% 9%;
    --muted: 0 0% 98%;
    --border: 0 0% 89.8%;
    --primary: 0 0% 9%;
    /* ... */
}
```

**Benefits:**

- Easy theme switching
- Consistent colors
- Dark mode ready

### Spacing Scale

Following Tailwind's spacing scale:

- `gap-4` = 1rem (16px)
- `p-4` = 1rem padding
- `sm:p-6` = 1.5rem on small screens+

---

## 🔧 Utilities

### Format Utilities

```typescript
import {formatCurrency, formatNumber, formatPercentage} from '@/lib/utils';

// Currency
formatCurrency(1234.56); // "$1,234.56"
formatCurrency(999999); // "$999,999"

// Numbers
formatNumber(1234567); // "1,234,567"
formatCompactNumber(1500); // "1.5K"
formatCompactNumber(2500000); // "2.5M"

// Percentages
formatPercentage(12.5); // "+12.5%"
formatPercentage(-3.2); // "-3.2%"

// Dates
formatRelativeTime(new Date()); // "just now"
```

### Class Name Utility

```typescript
import {cn} from '@/lib/utils';

// Merge classes
cn('px-4 py-2', 'bg-blue-500');
// → "px-4 py-2 bg-blue-500"

// Conditional classes
cn('px-4', isActive && 'bg-blue-500');
// → "px-4 bg-blue-500" (if isActive is true)

// Override Tailwind classes
cn('px-2', 'px-4');
// → "px-4" (later class wins)
```

---

## 🔐 Type Safety

### Strong Typing Examples

```typescript
// ✅ Good - Typed prop
interface MetricCardProps {
    metric: Metric;
}

function MetricCard({metric}: MetricCardProps) {
    // metric.id      ✅ Type-safe
    // metric.foo     ❌ TypeScript error
}

// ✅ Good - Typed data
const metrics: Metric[] = mockMetrics;

// ❌ Bad - Untyped
const metrics = [{foo: 'bar'}];
```

### Type Imports

```typescript
// ✅ Good - Type-only import
import type {Metric} from '@/types';

// ⚠️ OK but less clear
import {Metric} from '@/types';

// ❌ Bad - Direct interface in component
interface Metric {
    // ...
}
```

---

## 🧪 Testing Strategy (Future)

### Structure:

```
__tests__/
├── components/
│   ├── ui/
│   └── layout/
├── lib/
│   └── utils/
└── integration/
```

### Example Test:

```typescript
// __tests__/lib/utils/format.test.ts
import {formatCurrency} from '@/lib/utils';

describe('formatCurrency', () => {
    it('formats USD correctly', () => {
        expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });
});
```

---

## 🚀 Performance Considerations

### Current:

- ✅ Client-side rendering for interactive components
- ✅ Responsive charts with proper sizing
- ✅ Minimal bundle size

### Future Optimizations:

```typescript
// Dynamic imports for heavy components
const RevenueChart = dynamic(
  () => import("@/components/charts/revenue-chart"),
  { loading: () => <Skeleton />, ssr: false }
);

// Memoization
const MemoizedMetricCard = React.memo(MetricCard);

// Virtual scrolling for large lists
import { VirtualList } from "@/components/ui/virtual-list";
```

---

## 🔄 Data Flow

### Current (Development):

```
Mock Data (data/) → Component → UI
```

### Future (Production):

```
API → React Query → Custom Hook → Component → UI
         ↓
      Cache
```

### Example Future Flow:

```typescript
// lib/api/dashboard.ts
export async function fetchMetrics(): Promise<Metric[]> {
  const res = await fetch(`${appConfig.api.baseUrl}/metrics`);
  return res.json();
}

// lib/hooks/use-dashboard-data.ts
export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: fetchMetrics,
    refetchInterval: dashboardConfig.metrics.refreshInterval,
  });
}

// Component
export default function DashboardPage() {
  const { data: metrics, isLoading, error } = useDashboardData();

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorState />;

  return <>{/* Render with metrics */}</>;
}
```

---

## 📋 Code Conventions

### Naming:

- **Components:** PascalCase (`MetricCard.tsx`)
- **Files:** kebab-case (`dashboard-data.ts`)
- **Functions:** camelCase (`formatCurrency`)
- **Constants:** UPPER_SNAKE_CASE (`NAV_ITEMS`)
- **Types:** PascalCase (`Metric`, `Transaction`)

### File Organization:

```typescript
// 1. Imports - external first, then internal
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {formatCurrency} from '@/lib/utils';
import type {Metric} from '@/types';

// 2. Types/Interfaces
interface ComponentProps {
    // ...
}

// 3. Constants (if needed in file)
const DEFAULT_VALUE = 10;

// 4. Component/Function
export default function Component() {
    // ...
}
```

### Export Patterns:

```typescript
// ✅ Good - Named export for utils
export function formatCurrency() {}

// ✅ Good - Default export for components
export default function MetricCard() {}

// ✅ Good - Type-only export
export type {Metric};
```

---

## 🌐 Environment Variables

### Setup:

```bash
# .env.local (not committed)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Usage:

```typescript
// config/app.ts
export const appConfig = {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    },
};
```

---

## 🎯 Summary

You now have a **senior-level** architecture that is:

1. **Maintainable** - Easy to understand and modify
2. **Scalable** - Can grow without major refactoring
3. **Type-Safe** - Catches errors at compile time
4. **Testable** - Isolated units for testing
5. **Professional** - Follows industry best practices
6. **Team-Ready** - Clear conventions and structure

**This is production-ready architecture!** 🚀
