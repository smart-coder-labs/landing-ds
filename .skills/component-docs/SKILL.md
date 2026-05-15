---
name: component-docs
description: >
  Specialized skill for creating comprehensive and structured component documentation following a specific format including Features, Anatomy, API Reference, Examples, and Accessibility.
  Trigger: "create component docs", "document component", "create documentation page", "documentacion del componente", "crear docs".
version: 1.0.0
author: github.com/cr8297408
license: Apache-2.0
tags:
  - documentation
  - components
  - radix-ui
  - accessibility
allowed_tools:
  - view_file
  - write_to_file
  - run_command
---

# Component Documentation Specialist

## 1. Overview
This skill specializes in generating standardized, high-quality documentation for UI components. It ensures every component documentation page follows a strict structural template covering features, anatomy, API reference, code examples, and accessibility guidelines.

## 2. Prerequisites & Context
*   **Required Tools**:
    *   `view_file`: To read the source code of the component being documented.
    *   `write_to_file`: To generate the Markdown/MDX documentation file.
*   **Input**:
    *   Component source code.
    *   Props interface.
    *   Usage examples.

## 3. Mandatory Documentation Structure
Every component documentation MUST strictly follow this exact outline and structure:

```markdown
# [Component Name]

[Short description of the component]

## Features

- Can be controlled or uncontrolled.
- Supports horizontal/vertical orientation.
- Supports automatic/manual activation.
- Full keyboard navigation.
*(Add or remove features according to the actual component)*

## Component Reference Links
- [View source](#)
- [Report an issue](#)
- [ARIA design pattern](#)
- [View as Markdown](#)

## Installation

Install the component from your command line.

\`\`\`bash
npm install [package-name]
\`\`\`

## Anatomy

Import all parts and piece them together.

\`\`\`tsx
import { [Component] } from "radix-ui"; // or the actual import path

export default () => (
	<[Component].Root>
		<[Component].List>
			<[Component].Trigger />
		</[Component].List>
		<[Component].Content />
	</[Component].Root>
);
\`\`\`

## API Reference

### Root
Contains all the [Component] parts.

| Prop | Type | Default |
|---|---|---|
| asChild | boolean | false |
| defaultValue | string | No default value |
| value | string | No default value |
| onValueChange | function | No default value |
| orientation | enum | "horizontal" |
| dir | enum | No default value |
| activationMode | enum | "automatic" |

| Data attribute | Values |
|---|---|
| [data-orientation] | "vertical" \| "horizontal" |

### List
Contains the triggers that are aligned along the edge of the active content.

| Prop | Type | Default |
|---|---|---|
| asChild | boolean | false |
| loop | boolean | true |

| Data attribute | Values |
|---|---|
| [data-orientation] | "vertical" \| "horizontal" |

### Trigger
The button that activates its associated content.

| Prop | Type | Default |
|---|---|---|
| asChild | boolean | false |
| value* | string | No default value |
| disabled | boolean | false |

| Data attribute | Values |
|---|---|
| [data-state] | "active" \| "inactive" |
| [data-disabled] | Present when disabled |
| [data-orientation] | "vertical" \| "horizontal" |

### Content
Contains the content associated with each trigger.

| Prop | Type | Default |
|---|---|---|
| asChild | boolean | false |
| value* | string | No default value |
| forceMount | boolean | No default value |

| Data attribute | Values |
|---|---|
| [data-state] | "active" \| "inactive" |
| [data-orientation] | "vertical" \| "horizontal" |

## Examples

### [Example Name e.g., Vertical]
You can create vertical tabs by using the orientation prop.

\`\`\`tsx
import { Tabs } from "radix-ui";

export default () => (
	<Tabs.Root defaultValue="tab1" orientation="vertical">
		<Tabs.List aria-label="tabs example">
			<Tabs.Trigger value="tab1">One</Tabs.Trigger>
			<Tabs.Trigger value="tab2">Two</Tabs.Trigger>
			<Tabs.Trigger value="tab3">Three</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="tab1">Tab one content</Tabs.Content>
		<Tabs.Content value="tab2">Tab two content</Tabs.Content>
		<Tabs.Content value="tab3">Tab three content</Tabs.Content>
	</Tabs.Root>
);
\`\`\`

## Accessibility

Adheres to the [Component] WAI-ARIA design pattern.

### Keyboard Interactions

| Key | Description |
|---|---|
| [Key e.g., Tab] | When focus moves onto the tabs, focuses the active trigger. When a trigger is focused, moves focus to the active content. |
| [Key e.g., Right Arrow] | Moves focus to the next trigger depending on orientation and activates its associated content. |
| [Key e.g., Left Arrow] | Moves focus to the previous trigger depending on orientation and activates its associated content. |
| [Key e.g., Home] | Moves focus to the first trigger and activates its associated content. |
| [Key e.g., End] | Moves focus to the last trigger and activates its associated content. |
```

## 4. Workflow
1.  **Analyze the Component**: Read the target component's source code to understand its Anatomy, API (Props), Features, and Keyboard Interactions.
2.  **Generate Documentation**: Create the MD/MDX file strictly following the structure above.
3.  **Fill API Reference**: Accurately populate the API Reference tables based on the component's TypeScript interfaces. Ensure all props and data attributes are documented.
4.  **Create Examples**: Write realistic code examples showing how to use the component and its variants.
5.  **Accessibility**: Properly document the keyboard interactions according to WAI-ARIA standards.
