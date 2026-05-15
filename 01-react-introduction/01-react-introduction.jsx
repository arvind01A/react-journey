// ============================================================
// Section 1 — React Introduction
// Practice: Easy → Moderate → Hard
// Run in browser via the demo HTML file (01-react-introduction-demo.html)
// All examples use React 19 via CDN (no build step needed)
// ============================================================

// ─────────────────────────────────────────────────────────────
// EASY EXERCISES
// ─────────────────────────────────────────────────────────────

// E1: Your very first React component
// A component is just a function that returns JSX
function HelloReact() {
  return (
    <div className="card">
      <h1>⚛️ Hello, React 19!</h1>
      <p>I am a React component — a function that returns JSX.</p>
      <p>React version: {React.version}</p>
    </div>
  );
}

// E2: Props — passing data into a component
function WelcomeBanner({ name, role = "Developer", isNew = false }) {
  return (
    <div className="banner">
      <h2>Welcome, {name}!</h2>
      <p>Role: {role}</p>
      {isNew && <span className="badge">🆕 New Member</span>}
    </div>
  );
}
// Usage: <WelcomeBanner name="Alice" role="Engineer" isNew={true} />

// E3: Rendering a list — map + key
function TechList({ items }) {
  return (
    <ul className="tech-list">
      {items.map((item, index) => (
        <li key={item.id ?? index}>
          <strong>{item.name}</strong> — {item.description}
        </li>
      ))}
    </ul>
  );
}
// Usage:
// const techs = [
//   { id: 1, name: "React",    description: "UI library" },
//   { id: 2, name: "Vite",     description: "Build tool" },
//   { id: 3, name: "Node.js",  description: "JS runtime" },
// ];
// <TechList items={techs} />

// E4: Conditional rendering
function StatusMessage({ status }) {
  // Three patterns for conditional rendering:

  // Pattern 1: if/else (for complex conditions)
  if (status === "loading") return <p>⏳ Loading...</p>;

  // Pattern 2: ternary (inline)
  // Pattern 3: && (short-circuit)
  return (
    <div className={`status status--${status}`}>
      {status === "success" && <p>✅ Data loaded successfully!</p>}
      {status === "error"   && <p>❌ Something went wrong.</p>}
      {status === "empty"   && <p>📭 No data found.</p>}
      {!["success","error","empty"].includes(status) && (
        <p>Unknown status: {status}</p>
      )}
    </div>
  );
}

// E5: Component composition — building UIs from small pieces
function Avatar({ src, alt, size = 48 }) {
  return (
    <img
      src={src || `https://ui-avatars.com/api/?name=${alt}&size=${size}`}
      alt={alt}
      width={size}
      height={size}
      style={{ borderRadius: "50%", objectFit: "cover" }}
    />
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <Avatar src={user.avatar} alt={user.name} size={64} />
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.role}</p>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MODERATE EXERCISES
// ─────────────────────────────────────────────────────────────

// M1: Virtual DOM vs Real DOM — side-by-side update demo
function VDOMDemo() {
  const [count, setCount] = React.useState(0);
  const [realDOMUpdates, setRealDOMUpdates] = React.useState(0);
  const renderTimeRef = React.useRef(null);

  React.useEffect(() => {
    // Track how many times the real DOM actually updated
    setRealDOMUpdates(prev => prev + 1);
  });

  const handleClick = () => {
    const start = performance.now();
    setCount(c => c + 1);
    renderTimeRef.current = (performance.now() - start).toFixed(3);
  };

  return (
    <div className="vdom-demo">
      <h3>⚛️ Virtual DOM in Action</h3>
      <div className="demo-grid">
        <div className="demo-box">
          <h4>React State</h4>
          <p className="count">{count}</p>
          <small>React re-renders the VDOM</small>
        </div>
        <div className="demo-box highlight">
          <h4>Real DOM Updates</h4>
          <p className="count">{realDOMUpdates}</p>
          <small>Only changed nodes patched</small>
        </div>
        <div className="demo-box">
          <h4>Last Render</h4>
          <p className="count">{renderTimeRef.current ?? "—"}ms</p>
          <small>State update time</small>
        </div>
      </div>
      <button onClick={handleClick} className="btn btn-primary">
        Increment Counter
      </button>
      <p className="note">
        💡 React only updates the counter text in the DOM — not the entire card!
      </p>
    </div>
  );
}

// M2: SPA Navigation simulation (no routing library)
function SPADemo() {
  const [currentPage, setCurrentPage] = React.useState("home");
  const [navHistory, setNavHistory] = React.useState(["home"]);

  const navigate = (page) => {
    setCurrentPage(page);
    setNavHistory(prev => [...prev, page]);
  };

  const pages = {
    home: (
      <div>
        <h2>🏠 Home Page</h2>
        <p>Welcome! This is a Single Page Application.</p>
        <p>No full page reload happens when you navigate — React just swaps components!</p>
      </div>
    ),
    about: (
      <div>
        <h2>📖 About Page</h2>
        <p>React 19 is a JavaScript library for building user interfaces.</p>
        <p>The URL doesn't even change here — in a real app, React Router handles that.</p>
      </div>
    ),
    contact: (
      <div>
        <h2>📧 Contact Page</h2>
        <p>In a real SPA, each "page" is just a different component rendered in the same div.</p>
      </div>
    ),
  };

  return (
    <div className="spa-demo">
      <nav className="nav">
        {Object.keys(pages).map(page => (
          <button
            key={page}
            onClick={() => navigate(page)}
            className={`nav-btn ${currentPage === page ? "active" : ""}`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </nav>
      <div className="page-content">
        {pages[currentPage]}
      </div>
      <div className="history">
        <small>Navigation history: {navHistory.join(" → ")}</small>
      </div>
    </div>
  );
}

// M3: Declarative vs Imperative comparison
function DeclarativeDemo() {
  const [items, setItems] = React.useState([
    { id: 1, text: "Learn React",   done: true  },
    { id: 2, text: "Build a SPA",   done: false },
    { id: 3, text: "Master Hooks",  done: false },
  ]);
  const [filter, setFilter] = React.useState("all");

  const toggle = (id) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, done: !item.done } : item)
    );
  };

  const filtered = items.filter(item => {
    if (filter === "done")    return item.done;
    if (filter === "pending") return !item.done;
    return true;
  });

  // ✅ DECLARATIVE: just describe what the UI should look like
  // React figures out how to update the DOM
  return (
    <div className="todo-demo">
      <h3>✅ Declarative UI — To-Do List</h3>
      <p className="note">
        💡 We never touch the DOM directly. We describe the UI we want,
        and React makes it happen.
      </p>
      <div className="filter-bar">
        {["all","done","pending"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? "active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>
      <ul>
        {filtered.map(item => (
          <li
            key={item.id}
            onClick={() => toggle(item.id)}
            className={item.done ? "done" : ""}
          >
            {item.done ? "☑" : "☐"} {item.text}
          </li>
        ))}
      </ul>
      <p>
        {items.filter(i => i.done).length} / {items.length} completed
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HARD EXERCISES
// ─────────────────────────────────────────────────────────────

// H1: Build a mini React — understand how React works under the hood
// Simplified createElement + render to understand VDOM concept
const MiniReact = {
  // createElement creates a Virtual DOM node (plain JS object)
  createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.flat().map(child =>
          typeof child === "object" ? child : this.createTextNode(child)
        ),
      },
    };
  },

  createTextNode(text) {
    return { type: "TEXT_NODE", props: { nodeValue: String(text), children: [] } };
  },

  // render converts VDOM → Real DOM nodes
  render(vnode, container) {
    container.innerHTML = "";
    container.appendChild(this._createDOMNode(vnode));
  },

  _createDOMNode(vnode) {
    if (vnode.type === "TEXT_NODE") {
      return document.createTextNode(vnode.props.nodeValue);
    }
    const el = document.createElement(vnode.type);
    // Apply props
    Object.entries(vnode.props || {}).forEach(([key, val]) => {
      if (key === "children") return;
      if (key === "className") el.setAttribute("class", val);
      else if (key.startsWith("on")) el.addEventListener(key.slice(2).toLowerCase(), val);
      else el.setAttribute(key, val);
    });
    // Render children recursively
    (vnode.props.children || []).forEach(child => {
      el.appendChild(this._createDOMNode(child));
    });
    return el;
  },

  // Simple diff — shows the concept of reconciliation
  diff(oldVNode, newVNode) {
    if (!oldVNode) return { type: "CREATE", newVNode };
    if (!newVNode) return { type: "REMOVE" };
    if (oldVNode.type !== newVNode.type) return { type: "REPLACE", newVNode };
    if (typeof newVNode !== "object") {
      return oldVNode !== newVNode ? { type: "UPDATE", newVNode } : null;
    }
    // Same type — check prop changes
    const propChanges = {};
    const allKeys = new Set([
      ...Object.keys(oldVNode.props || {}),
      ...Object.keys(newVNode.props || {}),
    ]);
    allKeys.forEach(key => {
      if (key === "children") return;
      if (oldVNode.props?.[key] !== newVNode.props?.[key]) {
        propChanges[key] = newVNode.props?.[key];
      }
    });
    return Object.keys(propChanges).length ? { type: "PROPS", changes: propChanges } : null;
  },
};

function MiniReactDemo() {
  const [output, setOutput] = React.useState("");

  const runDemo = () => {
    const logs = [];

    // Create VDOM nodes (like React.createElement)
    const vdom1 = MiniReact.createElement("div", { className: "card" },
      MiniReact.createElement("h2", null, "Alice"),
      MiniReact.createElement("p", null, "Engineer"),
    );
    logs.push("VDOM 1 created: " + JSON.stringify(vdom1, null, 2).slice(0, 120) + "...");

    const vdom2 = MiniReact.createElement("div", { className: "card active" },
      MiniReact.createElement("h2", null, "Alice"),
      MiniReact.createElement("p", null, "Senior Engineer"),   // changed!
    );

    const diff = MiniReact.diff(vdom1, vdom2);
    logs.push("\nDiff result: " + JSON.stringify(diff));
    logs.push("\n💡 React found className change — only that attribute gets updated in Real DOM!");
    setOutput(logs.join("\n"));
  };

  return (
    <div className="mini-react-demo">
      <h3>🔬 Mini React — VDOM Under the Hood</h3>
      <button onClick={runDemo} className="btn btn-primary">Run Demo</button>
      {output && <pre className="code-output">{output}</pre>}
    </div>
  );
}

// H2: Component architecture visualiser
function ArchitectureVisualiser() {
  const [selected, setSelected] = React.useState(null);

  const components = {
    App:     { level: 0, x: 300, y: 20,  children: ["Navbar","Main","Footer"], desc: "Root component — holds global state" },
    Navbar:  { level: 1, x: 80,  y: 100, children: ["Logo","NavLinks"], desc: "Navigation bar — renders links" },
    Main:    { level: 1, x: 300, y: 100, children: ["Sidebar","Content"], desc: "Main area — layout component" },
    Footer:  { level: 1, x: 520, y: 100, children: [], desc: "Footer — purely presentational" },
    Logo:    { level: 2, x: 30,  y: 200, children: [], desc: "Brand logo component" },
    NavLinks:{ level: 2, x: 130, y: 200, children: [], desc: "Navigation links list" },
    Sidebar: { level: 2, x: 240, y: 200, children: [], desc: "Sidebar navigation/filters" },
    Content: { level: 2, x: 360, y: 200, children: ["Card"], desc: "Main content area" },
    Card:    { level: 3, x: 360, y: 300, children: [], desc: "Reusable content card (×n)" },
  };

  return (
    <div className="arch-demo">
      <h3>🏗️ Component Architecture</h3>
      <p className="note">Click any component to see its description</p>
      <div className="component-tree">
        {Object.entries(components).map(([name, info]) => (
          <div
            key={name}
            className={`comp-node level-${info.level} ${selected === name ? "selected" : ""}`}
            onClick={() => setSelected(name === selected ? null : name)}
          >
            {name}
            {info.children.length > 0 && (
              <span className="children-count">
                → {info.children.join(", ")}
              </span>
            )}
          </div>
        ))}
      </div>
      {selected && (
        <div className="comp-detail">
          <h4>⚛️ {selected}</h4>
          <p>{components[selected].desc}</p>
          <p>
            <strong>Children:</strong>{" "}
            {components[selected].children.length > 0
              ? components[selected].children.join(", ")
              : "None (leaf component)"}
          </p>
          <p>
            <strong>Level:</strong> {components[selected].level}
            {components[selected].level === 0 && " (Root)"}
            {components[selected].level === 3 && " (Leaf)"}
          </p>
        </div>
      )}
    </div>
  );
}

// H3: React 19 features showcase
function React19Features() {
  // useOptimistic — optimistic UI updates (React 19)
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Learn React 19", status: "done"    },
    { id: 2, text: "Try Actions",    status: "pending" },
    { id: 3, text: "Use Compiler",   status: "pending" },
  ]);

  // Simulate optimistic toggle (in real app: server action)
  const toggleTodo = async (id) => {
    // Optimistically update UI immediately
    setTodos(prev =>
      prev.map(t => t.id === id
        ? { ...t, status: t.status === "done" ? "pending" : "done" }
        : t
      )
    );
    // In React 19 with Actions, you'd use useOptimistic here
    // and it would auto-revert on server error
    await new Promise(r => setTimeout(r, 300)); // simulate API call
  };

  const features = [
    { name: "React Compiler",    status: "stable",      desc: "Auto-memoization — no more useMemo/useCallback" },
    { name: "Actions",           status: "stable",      desc: "Async state transitions with automatic pending states" },
    { name: "use() hook",        status: "stable",      desc: "Read Promises and Context during render" },
    { name: "useOptimistic",     status: "stable",      desc: "Optimistic UI updates that auto-revert on error" },
    { name: "Server Components", status: "stable",      desc: "Render on server — zero JS bundle cost" },
    { name: "ref as prop",       status: "stable",      desc: "No more forwardRef — pass ref like any prop" },
    { name: "Document Metadata", status: "stable",      desc: "<title> and <meta> directly in components" },
  ];

  return (
    <div className="features-demo">
      <h3>⚡ React 19 New Features</h3>
      <div className="feature-grid">
        {features.map(f => (
          <div key={f.name} className={`feature-card feature-${f.status}`}>
            <div className="feature-header">
              <strong>{f.name}</strong>
              <span className={`badge badge-${f.status}`}>{f.status}</span>
            </div>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <h4>Interactive: Optimistic Todo (React 19 pattern)</h4>
      <ul className="opt-todos">
        {todos.map(t => (
          <li
            key={t.id}
            onClick={() => toggleTodo(t.id)}
            className={`opt-todo opt-todo--${t.status}`}
          >
            {t.status === "done" ? "✅" : "⏳"} {t.text}
            <small> (click to toggle)</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export all components for use in demo HTML
// (In a real React app these would be imported via ES modules)
window.ReactComponents = {
  HelloReact,
  WelcomeBanner,
  TechList,
  StatusMessage,
  UserCard,
  VDOMDemo,
  SPADemo,
  DeclarativeDemo,
  MiniReactDemo,
  ArchitectureVisualiser,
  React19Features,
};
