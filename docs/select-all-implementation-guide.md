# Select All Feature - Implementation Guide

## Quick Start

This guide explains how to implement the select all functionality in your React components.

## Prerequisites

- React 18+
- TypeScript
- Basic understanding of React hooks and state management

## Step-by-Step Implementation

### 1. Parent Component Setup

Add the select all state and handler to your parent component:

```typescript
import { useState, useEffect } from 'react';

interface ParentProps {
  items: any[];
  handleCheck: (item: any) => void;
  deleteStep: boolean;
}

const ParentComponent = ({ items, handleCheck, deleteStep }: ParentProps) => {
  const [selectAll, setSelectAll] = useState(false);

  // Auto-sync select all state
  useEffect(() => {
    if (!deleteStep) return;
    
    const allItems = items.flatMap((row: any) => row.rows || []);
    
    if (allItems.length === 0) {
      setSelectAll(false);
      return;
    }
    
    const allChecked = allItems.every((item: any) => item.checked === true);
    setSelectAll(allChecked);
  }, [items, deleteStep]);

  // Select all handler
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    const allItems = items.flatMap((row: any) => row.rows || []);
    
    allItems.forEach((item: any) => {
      item.checked = newSelectAll;
      handleCheck(item);
    });
  };

  return (
    <div>
      <HeaderComponent 
        selectAll={selectAll}
        onSelectAll={handleSelectAll}
        deleteStep={deleteStep}
      />
      {/* Your other components */}
    </div>
  );
};
```

### 2. Header Component

Create a header component with the select all checkbox:

```typescript
import { CheckLine } from './IconGenerator/Svg';

interface HeaderProps {
  selectAll: boolean;
  onSelectAll: () => void;
  deleteStep: boolean;
  headColumns: any[];
}

const HeaderComponent = ({ 
  selectAll, 
  onSelectAll, 
  deleteStep, 
  headColumns 
}: HeaderProps) => {
  return (
    <div className="header-container">
      <div className="flex items-center">
        {deleteStep && (
          <div
            onClick={onSelectAll}
            className={`checkbox-container ${
              selectAll ? 'checked' : 'unchecked'
            }`}
          >
            <div className="checkbox-inner">
              {selectAll && <CheckLine fill="white" />}
            </div>
          </div>
        )}
        
        {headColumns.map((column) => (
          <div key={column.id} className="column-header">
            {column.title}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 3. Item Component

Ensure your item components handle individual selection:

```typescript
interface ItemProps {
  item: any;
  deleteStep: boolean;
  handleCheck: (item: any) => void;
}

const ItemComponent = ({ item, deleteStep, handleCheck }: ItemProps) => {
  return (
    <div className="item-container">
      {deleteStep && (
        <div
          onClick={() => {
            item.checked = !item.checked;
            handleCheck(item);
          }}
          className={`item-checkbox ${
            item.checked ? 'checked' : 'unchecked'
          }`}
        >
          <div className="checkbox-inner">
            {item.checked && <CheckLine fill="white" />}
          </div>
        </div>
      )}
      
      {/* Item content */}
      <div className="item-content">
        {item.name}
      </div>
    </div>
  );
};
```

## CSS Styles

Add these styles to your CSS file:

```css
.checkbox-container {
  width: 18px;
  height: 18px;
  border: 1px solid var(--main);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  transition: background-color 0.2s;
}

.checkbox-container.checked {
  background-color: var(--main);
}

.checkbox-container.unchecked {
  background-color: transparent;
}

.checkbox-inner {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-checkbox {
  width: 18px;
  height: 18px;
  border: 1px solid var(--main);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  transition: background-color 0.2s;
}

.item-checkbox.checked {
  background-color: var(--main);
}

.item-checkbox.unchecked {
  background-color: transparent;
}
```

## Data Structure

Ensure your data structure supports the checked property:

```typescript
interface Item {
  id: string | number;
  name: string;
  checked?: boolean;
  // ... other properties
}

interface Row {
  id: string | number;
  rows: Item[];
  // ... other properties
}

interface DataStructure {
  items: Row[];
}
```

## State Management Patterns

### Option 1: Local State (Recommended for simple cases)

```typescript
const [selectAll, setSelectAll] = useState(false);
const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
```

### Option 2: Redux/Context (For complex applications)

```typescript
// Redux slice
const selectionSlice = createSlice({
  name: 'selection',
  initialState: {
    selectAll: false,
    checkedItems: new Set<string>(),
  },
  reducers: {
    setSelectAll: (state, action) => {
      state.selectAll = action.payload;
    },
    toggleItem: (state, action) => {
      const itemId = action.payload;
      if (state.checkedItems.has(itemId)) {
        state.checkedItems.delete(itemId);
      } else {
        state.checkedItems.add(itemId);
      }
    },
  },
});
```

## Performance Optimization

### 1. Memoization

```typescript
import { useMemo, useCallback } from 'react';

const ParentComponent = ({ items, handleCheck, deleteStep }: ParentProps) => {
  const [selectAll, setSelectAll] = useState(false);

  // Memoize all items calculation
  const allItems = useMemo(() => {
    return items.flatMap((row: any) => row.rows || []);
  }, [items]);

  // Memoize select all handler
  const handleSelectAll = useCallback(() => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    allItems.forEach((item: any) => {
      item.checked = newSelectAll;
      handleCheck(item);
    });
  }, [selectAll, allItems, handleCheck]);

  // Memoize auto-sync effect
  useEffect(() => {
    if (!deleteStep || allItems.length === 0) {
      setSelectAll(false);
      return;
    }
    
    const allChecked = allItems.every((item: any) => item.checked === true);
    setSelectAll(allChecked);
  }, [allItems, deleteStep]);

  return (
    // ... component JSX
  );
};
```

### 2. Virtual Scrolling (For large lists)

```typescript
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items, handleCheck, deleteStep }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemComponent 
        item={items[index]}
        deleteStep={deleteStep}
        handleCheck={handleCheck}
      />
    </div>
  );

  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </List>
  );
};
```

## Testing

### Unit Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ParentComponent } from './ParentComponent';

describe('Select All Feature', () => {
  const mockItems = [
    {
      id: 1,
      rows: [
        { id: '1', name: 'Item 1', checked: false },
        { id: '2', name: 'Item 2', checked: false },
      ],
    },
  ];

  const mockHandleCheck = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should select all items when header checkbox is clicked', () => {
    render(
      <ParentComponent
        items={mockItems}
        handleCheck={mockHandleCheck}
        deleteStep={true}
      />
    );

    const headerCheckbox = screen.getByRole('checkbox');
    fireEvent.click(headerCheckbox);

    expect(mockHandleCheck).toHaveBeenCalledTimes(2);
    expect(mockHandleCheck).toHaveBeenCalledWith(
      expect.objectContaining({ checked: true })
    );
  });

  it('should update header checkbox when all items are selected', () => {
    const allSelectedItems = [
      {
        id: 1,
        rows: [
          { id: '1', name: 'Item 1', checked: true },
          { id: '2', name: 'Item 2', checked: true },
        ],
      },
    ];

    render(
      <ParentComponent
        items={allSelectedItems}
        handleCheck={mockHandleCheck}
        deleteStep={true}
      />
    );

    const headerCheckbox = screen.getByRole('checkbox');
    expect(headerCheckbox).toBeChecked();
  });
});
```

### Integration Tests

```typescript
describe('Select All Integration', () => {
  it('should work with real data flow', async () => {
    // Test the complete flow from parent to child components
  });

  it('should handle edge cases', async () => {
    // Test with empty lists, large lists, etc.
  });
});
```

## Common Pitfalls

### 1. State Synchronization Issues

**Problem**: Header checkbox doesn't reflect individual selections
**Solution**: Ensure useEffect dependencies are correct

```typescript
// ❌ Wrong
useEffect(() => {
  // ... logic
}, [items]); // Missing dependencies

// ✅ Correct
useEffect(() => {
  // ... logic
}, [items, deleteStep, checkedList]);
```

### 2. Performance Issues with Large Lists

**Problem**: Slow rendering with many items
**Solution**: Use virtualization or pagination

```typescript
// For large lists, consider pagination
const ITEMS_PER_PAGE = 50;
const [currentPage, setCurrentPage] = useState(1);

const paginatedItems = items.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);
```

### 3. Memory Leaks

**Problem**: useEffect cleanup not handled
**Solution**: Add cleanup function

```typescript
useEffect(() => {
  let isMounted = true;

  const updateSelectAll = () => {
    if (!isMounted) return;
    // ... logic
  };

  updateSelectAll();

  return () => {
    isMounted = false;
  };
}, [items, deleteStep]);
```

## Best Practices

1. **Type Safety**: Always use TypeScript interfaces
2. **Performance**: Memoize expensive calculations
3. **Testing**: Write comprehensive tests
4. **Accessibility**: Add proper ARIA labels
5. **Error Handling**: Handle edge cases gracefully

## Accessibility

```typescript
const HeaderComponent = ({ selectAll, onSelectAll, deleteStep }: HeaderProps) => {
  return (
    <div className="header-container">
      {deleteStep && (
        <button
          onClick={onSelectAll}
          aria-label={selectAll ? 'Deselect all items' : 'Select all items'}
          aria-checked={selectAll}
          role="checkbox"
          className="checkbox-button"
        >
          <div className="checkbox-visual">
            {selectAll && <CheckLine fill="white" />}
          </div>
        </button>
      )}
    </div>
  );
};
```

## Migration Guide

If you're migrating from an existing implementation:

1. **Backup**: Create a backup of your current code
2. **Incremental**: Implement changes step by step
3. **Test**: Test each step thoroughly
4. **Rollback**: Keep the old implementation as a fallback

---

*This guide covers the essential aspects of implementing the select all feature. For more advanced use cases, refer to the main documentation.* 