# Testing Capabilities — landing-ds

**Project**: @smart-coder-labs/landing  
**Detected**: 2026-05-14  
**Strict TDD Mode**: ❌ Disabled (no test infrastructure found)

## Test Runner
- **Status**: ❌ Not configured
- **Available frameworks**: vitest, jest (can be installed)
- **Recommendation**: Install `vitest` for React + TypeScript

## Test Layers

| Layer | Available | Tool | Command |
|-------|-----------|------|---------|
| Unit | ❌ | — | — |
| Integration | ❌ | — | — |
| E2E | ❌ | — | — |

## Coverage

- **Available**: ❌
- **Tool**: —
- **Command**: —

## Quality Tools

| Tool | Available | Command |
|------|-----------|---------|
| Linter | ❌ | — |
| Type checker | ✅ | `tsc --noEmit` |
| Formatter | ❌ | — |

## TypeScript Checking

- **Status**: ✅ Enabled via `tsconfig.json`
- **Command**: `npx tsc --noEmit`
- **Configuration**: `strict: true`, `noEmit: true`
- **Note**: TypeScript is configured but no test runner integrates with it

## Recommendations

To enable Strict TDD, add:

### 1. Vitest (Recommended for Vite projects)
```bash
npm install -D vitest @vitest/ui @vitest/coverage-v8
npm install -D @testing-library/react @testing-library/user-event
npm install -D jsdom # for DOM simulation
```

**vite.config.ts** add:
```typescript
import { defineConfig } from 'vite'
import { getViteConfig } from 'vitest/config'

export default defineConfig(
  getViteConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['**/*.d.ts', 'src/**/*.stories.tsx'],
      },
    },
  })
)
```

**package.json** add:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

### 2. ESLint (Code quality)
```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### 3. Prettier (Code formatting)
```bash
npm install -D prettier
```

## Current State

⚠️ **Warning**: No test infrastructure exists. All tests must be added manually before Strict TDD can be enabled in SDD phases.

The project has:
- TypeScript compiler for type checking
- Vite build system (test-compatible)
- React 19 + testing-library ready (after install)

The project lacks:
- Test runner (vitest/jest)
- Test coverage tools
- Linter (ESLint)
- Code formatter (Prettier)

---

## SDD Testing Strategy

With testing tools installed, follow this strategy:

| Phase | Testing Rule |
|-------|--------------|
| **Explore** | Validate assumptions; identify test categories |
| **Spec** | Write acceptance criteria as testable scenarios |
| **Design** | Design test layers (unit, integration, E2E) |
| **Tasks** | Each task includes test cases |
| **Apply** | Implement code + tests in same commit |
| **Verify** | All tests pass; coverage meets threshold |
| **Archive** | Keep test artifacts; document coverage gaps |

