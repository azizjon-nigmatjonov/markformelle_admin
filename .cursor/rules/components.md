# Component Development Rules

## Project Overview
This is a React TypeScript admin panel for a manufacturing/textile company. All components should follow the established patterns and conventions.

## Component Structure & Organization

### Directory Structure
```
src/components/
├── CElements/          # Complex UI components
│   ├── CAlert/
│   ├── CModal/
│   ├── CTable/
│   └── ...
├── HFElements/         # Form-related components
│   ├── HFInput/
│   ├── HFTextField/
│   ├── HFSelect/
│   └── ...
└── UI/                 # Basic UI components
    ├── Buttons/
    ├── Sidebar/
    ├── Header/
    └── ...
```

### File Naming Conventions
- Use PascalCase for component files: `ComponentName.tsx`
- Use kebab-case for CSS files: `component-name.scss`
- Use camelCase for utility files: `componentUtils.ts`
- Use kebab-case for redux files `component.sice.tsx`

## Component Development Guidelines

### 1. Component Template Structure
```typescript
import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

interface IComponentName {
  // Define all props with proper types
}


type TComponentName {
  // Define all props with proper types
}

import Logics from 'Logics.tsx'

export const ComponentName = ({ prop1, prop2 }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useState<IFilterParams>({ page: 1, perPage: 50 })
  const [localState, setLocalState] = useState();
  
  const { handleActions,  } = Logics()
  
  return (
    <div className="component-wrapper">
      {/* Component JSX */}
    </div>
  );
};
```

### 3. Styling Guidelines

#### CSS Variables Usage
```typescript
// Use CSS variables for colors
className="text-[var(--black)] bg-[var(--main)] border-[var(--border)]"

// Avoid hardcoded colors
// ❌ Bad
className="text-black bg-blue-500"

// ✅ Good  
className="text-[var(--black)] bg-[var(--main)]"
```

#### Background Colors for Inputs
```typescript
// Always ensure inputs have white backgrounds (dark mode fix)
className="bg-white text-[var(--black)]"

// For form components
<input className="bg-white border border-[var(--border)]" />
```

### 4. Component Categories

#### CElements (Complex Components)
- Modal dialogs, tables, complex UI widgets
- Should be reusable across the application
- Include proper TypeScript interfaces
- Use CSS modules or Tailwind classes

```typescript
// Example: CModal component
interface CModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footerActive?: boolean;
}

export const CModal = ({ open, onClose, title, children, footerActive = true }: CModalProps) => {
  // Modal implementation
};
```

#### HFElements (Form Components)
- Input fields, form controls, validation components
- Integrate with React Hook Form
- Include proper error handling
- Use existing patterns from HFInput, HFTextField

```typescript
// Example: Custom form component
interface CustomInputProps {
  name: string;
  control: any;
  errors?: any;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

export const CustomInput = ({ name, control, errors, label, required, placeholder }: CustomInputProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="input-wrapper">
      {label && (
        <p className="font-[500] mb-[6px]">
          {required && <span className="text-[var(--error)] pr-1">*</span>}
          {t(label)}
        </p>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            className="w-full bg-white border border-[var(--border)] rounded-[8px] px-3 py-2"
            placeholder={t(placeholder || "")}
          />
        )}
      />
      {errors?.[name]?.message && (
        <p className="text-sm text-[var(--error)] mt-1">{t(errors[name].message)}</p>
      )}
    </div>
  );
};
```

#### UI Components (Basic Components)
- Buttons, icons, basic layout components
- Keep them simple and focused
- Use consistent styling patterns

```typescript
// Example: Custom button component
interface CustomButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export const CustomButton = ({ onClick, disabled, variant = 'primary', children }: CustomButtonProps) => {
  const baseClasses = "custom-btn";
  const variantClasses = {
    primary: "bg-[var(--main)] text-white",
    secondary: "bg-[var(--gray20)] text-[var(--black)]",
    danger: "bg-[var(--error)] text-white"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'disabled' : ''}`}
    >
      {children}
    </button>
  );
};
```

### 5. State Management

#### Local State
```typescript
// Use useState for local component state
const [isOpen, setIsOpen] = useState(false);
const [selectedItems, setSelectedItems] = useState<string[]>([]);
```

#### Redux State
```typescript
// Use useSelector and useDispatch for Redux
const user = useSelector((state: any) => state.auth.user);
const dispatch = useDispatch();

// Dispatch actions
dispatch(authActions.setUser(userData));
```

#### Form State
```typescript
// Use React Hook Form for forms
const { control, handleSubmit, formState: { errors }, watch } = useForm();

const onSubmit = (data: any) => {
  // Handle form submission
};
```

### 6. Performance Optimization

#### React.memo for Expensive Components
```typescript
export const ExpensiveComponent = React.memo(({ data }: Props) => {
  // Component logic
});
```

#### useMemo for Computed Values
```typescript
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);
```

#### useCallback for Event Handlers
```typescript
const handleClick = useCallback((id: string) => {
  // Handler logic
}, [dependencies]);
```

### 7. Error Handling

#### Try-Catch in Components
```typescript
const handleAction = async () => {
  try {
    const result = await apiCall();
    // Handle success
  } catch (error) {
    console.error('Error:', error);
    // Handle error appropriately
  }
};
```

#### Error Boundaries
```typescript
// Create error boundaries for critical components
class ErrorBoundary extends React.Component {
  // Error boundary implementation
}
```

### 8. Accessibility

#### Semantic HTML
```typescript
// Use semantic HTML elements
<button aria-label="Close modal" onClick={onClose}>
  <CloseIcon />
</button>

// Proper form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

#### ARIA Attributes
```typescript
// Include proper ARIA attributes
<div role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Modal Title</h2>
</div>
```

### 9. Testing Guidelines

#### Component Testing
```typescript
// Test component rendering and interactions
import { render, screen, fireEvent } from '@testing-library/react';

test('renders component correctly', () => {
  render(<ComponentName title="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### 10. Common Patterns

#### Conditional Rendering
```typescript
// Use conditional rendering
{isLoading ? (
  <div className="loading-spinner">Loading...</div>
) : (
  <div className="content">{children}</div>
)}
```

#### List Rendering
```typescript
// Use proper keys for lists
{items.map((item) => (
  <div key={item.id} className="item">
    {item.name}
  </div>
))}
```

#### Event Handling
```typescript
// Use proper event handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Handle submission
};
```

### 11. Import/Export Guidelines

#### Import Order
```typescript
// 1. React and related
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

// 3. Internal components
import { CustomButton } from '../UI/Buttons';
import { HFInput } from '../HFElements/HFInput';

// 4. Utilities and types
import { formatDate } from '../../utils/dateUtils';
import { User } from '../../interfaces/user';
```

#### Export Patterns
```typescript
// Default export for main component
export default ComponentName;

// Named exports for utilities
export const componentUtils = {};

// Type exports
export type { ComponentProps };
```

### 12. Documentation

#### Component Documentation
```typescript
/**
 * ComponentName - Brief description
 * 
 * @param title - The title to display
 * @param disabled - Whether the component is disabled
 * @param onAction - Callback function when action is triggered
 * 
 * @example
 * <ComponentName title="My Component" onAction={handleAction} />
 */
export const ComponentName = ({ title, disabled, onAction }: Props) => {
  // Component implementation
};
```

### 13. Avoid These Patterns

#### ❌ Don't Do
```typescript
// Don't use any type without justification
const handleData = (data: any) => {};

// Don't create components outside established patterns
const MyComponent = () => <div>Content</div>;

// Don't use inline styles when CSS classes are available
<div style={{ backgroundColor: 'white' }} />

// Don't forget error handling
const handleApiCall = async () => {
  const data = await api.getData(); // Missing try-catch
};
```

#### ✅ Do This Instead
```typescript
// Use proper typing
const handleData = (data: UserData) => {};

// Follow established patterns
export const MyComponent = ({ title }: Props) => (
  <div className="component-class">{title}</div>
);

// Use CSS classes
<div className="bg-white" />

// Include proper error handling
const handleApiCall = async () => {
  try {
    const data = await api.getData();
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

## Summary

- Always use TypeScript with proper interfaces
- Follow existing component patterns (CElements, HFElements, UI)
- Use CSS variables for colors and ensure white backgrounds on inputs
- Implement proper error handling and loading states
- Use React Hook Form for forms
- Optimize performance with React.memo, useMemo, useCallback
- Include proper accessibility attributes
- Write tests for new components
- Document components with JSDoc comments
