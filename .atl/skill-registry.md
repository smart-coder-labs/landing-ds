# Skill Registry — landing-ds

**Generated**: 2026-05-14  
**Project**: @smart-coder-labs/landing (React 19 + TypeScript + Vite)

## SDD Workflow Skills

These skills orchestrate structured software design and implementation:

### `/sdd-explore`
**Trigger**: Exploration or requirement clarification  
**Key rules**:
- Clarify intent and constraints before committing to a change
- Document unknowns and validate assumptions
- Produce exploration notes for team alignment
- Do not skip this for complex changes

### `/sdd-propose`
**Trigger**: Creating SDD change proposal  
**Key rules**:
- Define intent, scope, and high-level approach
- Link to exploration findings if applicable
- Require approval before moving to spec
- Scope must be reviewable in one PR or chained PRs

### `/sdd-spec`
**Trigger**: Writing delta specs with requirements and scenarios  
**Key rules**:
- Write explicit requirements with acceptance criteria
- Include integration points and data flows
- Validate against existing architecture
- Spec must be implementable in planned tasks

### `/sdd-design`
**Trigger**: Technical design and architecture approach  
**Key rules**:
- Design from first principles using solid architecture patterns
- Document tradeoffs and alternative approaches
- Validate against Vite + React + TypeScript patterns
- Consider design system integration (apple-design-system)

### `/sdd-tasks`
**Trigger**: Break change into implementation tasks  
**Key rules**:
- Each task is a standalone work unit with clear state transition
- Tasks include verification steps
- Review Workload Forecast alerts on high-line-count changes
- Group related tasks into chained PR slices if >400 lines predicted

### `/sdd-apply`
**Trigger**: Implement tasks from specs and design  
**Key rules**:
- Follow work-unit-commits discipline (one deliverable per commit)
- Keep tests with code, docs with features
- Reference task IDs in conventional commit messages
- Stop if tests don't pass before moving to next task

### `/sdd-verify`
**Trigger**: Verify implementation matches specs and design  
**Key rules**:
- Run full test suite
- Validate against spec acceptance criteria
- Check design patterns are applied consistently
- Produce verification report before archiving

### `/sdd-archive`
**Trigger**: Archive completed SDD change  
**Key rules**:
- Sync delta specs into project memory
- Close linked issue
- Retain task artifacts for future reference
- Mark change as complete

## Code Quality Skills

### `/work-unit-commits`
**Trigger**: Implementation, commit splitting, chained PRs  
**Key rules**:
- One commit = one deliverable behavior, fix, migration, or docs unit
- Keep tests with code; keep docs with features
- Commit message explains outcome, not file list
- Each commit must be independently reviewable and rollbackable

### `/branch-pr`
**Trigger**: Creating or opening a PR  
**Key rules**:
- Every PR MUST link an approved issue (no exceptions)
- Branch naming: `type/description` (feat/fix/chore/docs/etc)
- Exactly one `type:*` label per PR
- All automated checks must pass before merge

### `/chained-pr`
**Trigger**: PRs over 400 lines, stacked PRs, review slices  
**Key rules**:
- Split large changes into chained PRs protecting review focus
- Each slice is independently deployable or logically complete
- Maintain order dependency if applicable
- Use `stack:N-of-M` labels for tracking

### `/comment-writer`
**Trigger**: PR feedback, issue replies, code review comments  
**Key rules**:
- Warm, direct, and from a place of caring
- Explain WHY not just WHAT
- Suggest alternatives with tradeoffs
- Keep comments constructive and focused

## Documentation Skills

### `/cognitive-doc-design`
**Trigger**: Writing guides, READMEs, design docs, architecture docs  
**Key rules**:
- Reduce cognitive load: chunking, progressive disclosure, examples
- Lead with problem/goal, then solution
- Include diagrams or visual hierarchy where helpful
- Link to related concepts, not isolated facts

### `/issue-creation`
**Trigger**: Creating GitHub issues, bug reports, feature requests  
**Key rules**:
- Issues must be approved before PR linkage
- Clear acceptance criteria for features
- Reproduction steps for bugs (minimal example when possible)
- Link related issues and design docs

## Project Conventions

### Agent Instructions
**File**: `/Users/cesar/.config/opencode/AGENTS.md`  
**Rules**:
- No "Co-Authored-By" or AI attribution in commits
- Never build after changes
- Verify claims before stating them
- When user is wrong, explain WHY with evidence
- Propose alternatives with tradeoffs

### Technology Stack
- **Runtime**: Node.js (ESM)
- **Framework**: React 19
- **Language**: TypeScript 5.8 (strict mode)
- **Build**: Vite 6.3
- **Styling**: Tailwind CSS 4.1 + PostCSS
- **Design System**: @smart-coder-labs/apple-design-system
- **Routing**: React Router v7
- **Animations**: Framer Motion 12.38
- **Icons**: Lucide React 0.554
- **UI Utils**: CVA, clsx, tailwind-merge

### Project Structure
```
src/
├── App.tsx              # Root component
├── main.tsx             # Entry point
├── pages/               # Page components
├── sections/            # Section components
├── components/          # Reusable components
├── hooks/               # Custom React hooks
├── layouts/             # Layout wrappers
├── lib/                 # Utilities and helpers
├── data/                # Constants and data
└── landing.css          # Global styles
```

### Build & Dev
- **Dev**: `npm run dev` (Vite dev server on :5173)
- **Build**: `npm run build` (Vite production build)
- **Preview**: `npm run preview` (local preview of production build)

### TypeScript Configuration
- **Target**: ES2020
- **Module**: ESNext (ESM)
- **Strict**: true
- **Path aliases**: `@/*` → parent directory, `@ds/*` → design system paths
- **JSX**: react-jsx (automatic)

### No Test Infrastructure Detected
⚠️ **Note**: This project has no test runner, linter, formatter, or coverage tool configured.  
Strict TDD is **disabled** by default. Consider adding:
- `vitest` or `jest` for unit/integration tests
- `playwright` for E2E testing
- `eslint` for linting
- `prettier` for formatting

---

## Next Steps

1. **Explore**: Use `/sdd-explore` to clarify what change you want to make
2. **Propose**: Create an SDD proposal with intent and scope
3. **Spec**: Write requirements and scenarios
4. **Design**: Document the technical approach
5. **Tasks**: Break into implementation work units
6. **Apply**: Implement with work-unit-commits discipline
7. **Verify**: Validate against specs and design
8. **Archive**: Store artifacts in project memory

For PR creation, use `/branch-pr` + `/work-unit-commits` to keep changes reviewable.

