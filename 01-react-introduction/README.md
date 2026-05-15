# ⚛️ Section 1 — React Introduction

> **React Version:** 19 · **Released:** 2024 · **Maintained by:** Meta (Facebook)

---

## What is React.js?

React is a **JavaScript library** for building user interfaces — specifically component-based, declarative UIs that efficiently update when data changes.

```
React is NOT a framework — it handles only the View layer (UI).
For full apps, React is combined with: React Router, Zustand/Redux, React Query, etc.
```

**Key facts:**
- Created by **Jordan Walke** at Facebook, open-sourced in **2013**
- Current stable: **React 19** (2024) — introduces Actions, use(), compiler
- Used by: Facebook, Instagram, Netflix, Airbnb, Discord, WhatsApp Web
- License: MIT (open source)
- Weekly npm downloads: **~22 million**

---

## Why React?

| Problem (Vanilla JS) | React Solution |
|---|---|
| Manual DOM updates are error-prone | Declarative UI — describe what to show, React handles how |
| State & UI get out of sync | State-driven rendering — UI always mirrors state |
| Code becomes spaghetti at scale | Component-based — isolated, reusable pieces |
| Hard to reuse UI logic | Custom hooks — share stateful logic cleanly |
| Slow full-page reloads | Virtual DOM — minimal, targeted DOM updates |
| No standard app structure | Component tree provides clear architecture |

### React 19 New Features
```
✅ React Compiler (auto-memoization — no more useMemo/useCallback everywhere)
✅ Actions (async state transitions, replaces manual loading/error state)
✅ use() hook (read Promises and Context in render)
✅ useOptimistic() (optimistic UI updates)
✅ useFormStatus() (form submission states)
✅ Server Components (stable) — render on server, zero bundle cost
✅ ref as prop (no more forwardRef wrapper needed)
✅ Document Metadata (<title>, <meta> directly in components)
```

---

## SPA (Single Page Application)

### Traditional Multi-Page App (MPA)
```
User clicks link
  → Browser sends request to server
  → Server returns full HTML page
  → Browser re-renders entire page
  → Repeat for every navigation
```

### Single Page Application (SPA)
```
Browser loads ONE HTML file (index.html)
  → JavaScript bundle loads
  → React takes control of routing
  → Navigation = JS updates the DOM (no full page reload)
  → Only data fetched from server (JSON via API)
```

```html
<!-- index.html — the only HTML file in a React SPA -->
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>          <!-- React mounts here -->
    <script src="bundle.js"></script>
  </body>
</html>
```

```jsx
// main.jsx — React takes over the #root div
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

### SPA Pros & Cons
| ✅ Pros | ❌ Cons |
|---|---|
| Faster navigation after initial load | Larger initial bundle size |
| Better user experience (no flicker) | SEO challenges (mitigated by SSR/SSG) |
| Clear API separation (backend = JSON) | Requires JavaScript enabled |
| Rich, app-like interactions | Initial load slower |

---

## Virtual DOM

### What is the Virtual DOM?
The Virtual DOM (VDOM) is a **lightweight JavaScript object representation** of the real DOM tree. React keeps this in memory and uses it to calculate the minimum changes needed before touching the real DOM.

```
Real DOM Node:
  <div class="card" id="user-1">
    <h2>Alice</h2>
    <p>Engineer</p>
  </div>

Virtual DOM equivalent (React element = plain JS object):
  {
    type: "div",
    props: {
      className: "card",
      id: "user-1",
      children: [
        { type: "h2", props: { children: "Alice" } },
        { type: "p",  props: { children: "Engineer" } }
      ]
    }
  }
```

### How the Virtual DOM Works
```
1. Initial Render
   State → React renders VDOM tree → Commits to Real DOM

2. State Update
   New State → React renders NEW VDOM tree
             → Diff (Reconciliation): compare old VDOM vs new VDOM
             → Find minimal changes (patches)
             → Apply ONLY those changes to Real DOM
```

---

## Real DOM vs Virtual DOM

| Feature | Real DOM | Virtual DOM |
|---|---|---|
| What is it | Actual browser DOM tree | JS object in memory |
| Speed | Slow to update (reflow/repaint) | Fast to update (pure JS) |
| Direct manipulation | `document.getElementById(...)` | Handled by React |
| Full re-render cost | High (browser recalculates layout) | Low (just JS objects) |
| Update strategy | Replace or modify directly | Diff → patch minimally |
| Memory usage | In browser memory | Additional JS memory |

### Reconciliation (Diffing Algorithm)
```
React compares old VDOM vs new VDOM using these rules:

Rule 1 — Different type → destroy and rebuild
  Old: <div>...</div>
  New: <span>...</span>    ← React unmounts div, mounts span

Rule 2 — Same type → update attributes/children only
  Old: <div className="a">
  New: <div className="b"> ← React changes className only

Rule 3 — Lists need keys for efficient diffing
  <li key="alice">Alice</li>   ← key helps React track which item changed
  <li key="bob">Bob</li>
```

### React 19 — No More VDOM Overhead?
```
React Compiler (React 19) automatically memoizes components
and skips re-renders where nothing changed.
Result: Even fewer real DOM updates than before.
```

---

## React Architecture

```
React Application Architecture
─────────────────────────────────────────────────
  ┌─────────────────────────────────────────┐
  │              React App                  │
  │  ┌──────────────────────────────────┐   │
  │  │         Component Tree           │   │
  │  │   App                            │   │
  │  │   ├── Navbar                     │   │
  │  │   ├── Main                       │   │
  │  │   │   ├── Sidebar                │   │
  │  │   │   └── Content               │   │
  │  │   │       ├── Card (×n)          │   │
  │  │   └── Footer                    │   │
  │  └──────────────────────────────────┘   │
  │                                         │
  │  State: Props flow ↓  Events flow ↑     │
  └─────────────────────────────────────────┘
            ↕ Virtual DOM
  ┌─────────────────────────────────────────┐
  │            Real Browser DOM            │
  └─────────────────────────────────────────┘

Data flow: Unidirectional (top-down)
State lives at the top → passed as props down
User events bubble up → callbacks update state
```

### Key Layers
```
1. Components      — Building blocks (functions returning JSX)
2. Props           — Data passed parent → child (read-only)
3. State           — Data that changes (triggers re-render)
4. Context         — Global data without prop drilling
5. Hooks           — Reusable stateful logic
6. React DOM       — Bridge between React and browser DOM
7. React DevTools  — Browser extension for debugging
```

---

## Component-Based Architecture

Everything in React is a **component** — a self-contained, reusable piece of UI.

```jsx
// A component is just a function that returns JSX
function UserCard({ name, role, avatar }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

// Compose components to build complex UIs
function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard key={user.id} {...user} />    // reuse UserCard for each user
      ))}
    </div>
  );
}
```

### Component Rules (React 19)
```
✅ Function name must start with CAPITAL letter
✅ Must return JSX (or null)
✅ Must be pure — same props = same output
✅ Cannot mutate props
✅ Side effects go in useEffect (or server actions in React 19)
✅ ref can now be passed as a regular prop (no forwardRef needed in React 19)
```

### Component Types
```jsx
// 1. Presentational (dumb) — just renders props
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// 2. Container (smart) — has state + logic
function Counter() {
  const [count, setCount] = useState(0);
  return <Button label={count} onClick={() => setCount(c => c + 1)} />;
}

// 3. Layout — wraps/positions children
function PageLayout({ children }) {
  return <div className="page"><main>{children}</main></div>;
}

// 4. Server Component (React 19) — runs on server, no hooks/state
async function UserProfile({ userId }) {
  const user = await db.users.findById(userId);  // direct DB access!
  return <div>{user.name}</div>;
}
```

---

## Declarative UI

### Imperative vs Declarative
```js
// ❌ IMPERATIVE (Vanilla JS) — HOW to do it, step by step
const list = document.getElementById("list");
const item = document.createElement("li");
item.textContent = "Alice";
item.className = "active";
list.appendChild(item);
// You manually manage every DOM operation

// ✅ DECLARATIVE (React) — WHAT to show, React figures out HOW
function UserList({ users, activeId }) {
  return (
    <ul>
      {users.map(u => (
        <li key={u.id} className={u.id === activeId ? "active" : ""}>
          {u.name}
        </li>
      ))}
    </ul>
  );
}
// Just describe the desired UI — React handles the DOM updates
```

### Declarative Principles in React
```jsx
// 1. UI is a function of state: UI = f(state)
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return isLoggedIn ? <Dashboard /> : <LoginPage />;
  // React always shows the right screen based on state
}

// 2. No manual DOM manipulation — just update state
function Toggle() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn(!on)}>
      {on ? "ON" : "OFF"}
    </button>
  );
  // Never: document.querySelector("button").textContent = "ON"
}

// 3. Conditional rendering is just JavaScript
function Greeting({ user }) {
  if (!user) return <p>Loading...</p>;
  if (user.error) return <p>Error: {user.error}</p>;
  return <h1>Welcome, {user.name}!</h1>;
}
```

---

## Quick Reference

| Concept | One-liner |
|---|---|
| React | JS library for building component-based UIs |
| Component | Function that accepts props and returns JSX |
| JSX | HTML-like syntax that compiles to `React.createElement()` |
| Virtual DOM | In-memory JS representation of the real DOM |
| Reconciliation | React's diffing algorithm to find minimal DOM changes |
| Props | Read-only data passed from parent to child |
| State | Mutable data that triggers re-render when changed |
| SPA | Single HTML page; JS handles all routing/rendering |
| Declarative | Describe WHAT the UI should look like, not HOW to build it |
| React 19 Compiler | Auto-memoizes components — no manual useMemo needed |

---

## Setup — React 19 Project

```bash
# Create new React 19 app (Vite — recommended)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Or with TypeScript
npm create vite@latest my-app -- --template react-ts

# Project structure
my-app/
├── index.html          ← SPA entry point
├── src/
│   ├── main.jsx        ← ReactDOM.createRoot → render
│   ├── App.jsx         ← Root component
│   └── components/
└── package.json
```
