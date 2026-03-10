# Frontend Architecture – 4 Layer Model (React)

We are structuring the React frontend into **4 clear architectural layers**:

```
UI
 ↓
Hooks (Orchestration)
 ↓
State Layer
 ↓
API Layer
```

Each layer has a **strict responsibility**.
If responsibilities mix, technical debt begins.

---

# 1 UI Layer (Presentation Layer)

### Location

```
features/*/pages/
features/*/components/
```

###  Responsibility

* Render UI
* Handle form input
* Trigger actions (onClick, onSubmit)
* Display loading and error states
* Navigate between routes

###  UI Must NOT

* Call API directly
* Access cookies/localStorage
* Parse tokens
* Manage global state directly
* Contain business rules
* Know backend response structure

UI should be **dumb and declarative**.

---

###  Example

```jsx
const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = async () => {
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      ...
    </form>
  );
};
```

UI calls hooks. Nothing else.

---

###  Why Keep UI Dumb?

If UI contains logic:

* Refactoring becomes risky
* Testing becomes hard
* Code duplication increases
* Business rules leak everywhere

---

# 2 Hooks Layer (Orchestration Layer)

### Location

```
features/*/hooks/
```

Example:

```
useAuth.ts
usePosts.ts
```

---

### Responsibility

* Connect UI to State
* Connect UI to API
* Combine multiple actions
* Handle async flows
* Expose clean, minimal interface to UI

Hooks act as the **controller layer** of frontend.

---

###  Example

```ts
export const useAuth = () => {
  const { setUser } = useAuthContext();

  const login = async (email, password) => {
    const response = await loginApi(email, password);
    setUser(response.user);
  };

  return { login };
};
```

UI does not know about:

* API structure
* Token storage
* Internal state management

---

###  Hooks Must NOT

* Render UI
* Directly manipulate DOM
* Contain infrastructure logic like axios setup
* Store persistent data directly (use storage utilities)

---

###  Why This Layer Is Critical

Without orchestration layer:

UI → API directly

Which causes:

* Duplication
* Tight coupling
* Hard-to-change architecture

---

# 3 State Layer (Global or Feature State)

### 📁 Location

```
features/*/auth.context.tsx
```

OR

```
features/*/store/
```

---

###  Responsibility

* Store global or feature state
* Provide derived values (e.g., isAuthenticated)
* Manage loading state
* Trigger updates when actions occur

State layer manages **data memory**, not logic flow.

---

###  Example (Context-Based)

```tsx
const [user, setUser] = useState(null);

const value = {
  user,
  isAuthenticated: !!user,
  setUser,
};
```

---

### State Layer Must NOT

* Call API directly (prefer orchestration via hooks)
* Navigate routes
* Render UI
* Show alerts/toasts
* Handle cookies directly

---

### Why Separate State From Hooks?

Hooks orchestrate.
State stores.

If state layer starts handling async flows heavily,
you’re mixing responsibilities.

---

# 4 API Layer (Backend Communication Layer)

### Location

```
features/*/services/
```

Example:

```
auth.api.ts
posts.api.ts
```

---

### Responsibility

* Communicate with backend
* Send HTTP requests
* Normalize responses
* Normalize errors

It isolates the app from backend changes.

---

###  Example

```ts
export const loginApi = async (email, password) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
```

---

###  API Layer Must NOT

* Update React state
* Navigate
* Show UI errors
* Access React hooks
* Render anything

API layer should be **pure infrastructure**.

---

###  Why This Layer Matters

If UI talks directly to axios:

* Every component knows backend structure
* Backend changes break many files
* Error handling becomes duplicated

With API layer:

* Only one file changes if backend changes

---

# Full Request Flow Example

Login Flow:

```
User clicks Login button
    ↓
UI Layer calls login() from useAuth
    ↓
Hook Layer calls loginApi()
    ↓
API Layer sends request to backend
    ↓
Response returned to Hook
    ↓
Hook updates State Layer
    ↓
UI re-renders automatically
```

Each layer performs exactly one responsibility.

---

# Strict Layer Rules

### UI can talk to:

* Hooks

### Hooks can talk to:

* State
* API

### State can talk to:

* Nothing (pure storage)

### API can talk to:

* Backend only

No skipping layers.

---

# Common Architecture Mistakes

- UI calling API directly
- API updating React state
- State handling navigation
- Hooks manipulating cookies directly
- Business rules inside components

Every violation increases coupling.

---

# Conclusion

Your 4-layer frontend architecture consists of:

1. **UI Layer** – renders and interacts
2. **Hooks Layer** – orchestrates logic
3. **State Layer** – stores data
4. **API Layer** – communicates with backend

When each layer respects its boundary,
your React app remains scalable and maintainable.
