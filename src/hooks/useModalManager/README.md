# Modal Manager Hook

The `useModalManager` hook provides a solution for managing nested modals with proper escape key handling and z-index management.

## Features

- **Escape Key Handling**: Automatically closes the topmost modal when Escape is pressed
- **Nested Modal Support**: Properly manages multiple open modals
- **Z-Index Management**: Automatically assigns and manages z-index values for proper layering
- **Global State**: Uses a singleton pattern to manage all modals across the application

## Usage

### Basic Usage

```tsx
import { useModalManager } from '../hooks/useModalManager';

const MyModal = ({ modalId, onClose }) => {
  const { zIndex, isTopModal } = useModalManager(modalId, onClose);
  
  return (
    <div style={{ zIndex }}>
      {/* Modal content */}
    </div>
  );
};
```

### With CNewMiniModal

```tsx
import CNewMiniModal from '../components/CElements/CNewMiniModal';

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleModalActions = (action: string) => {
    if (action === 'Close') {
      setIsModalOpen(false);
    }
  };
  
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      {isModalOpen && (
        <CNewMiniModal
          title="My Modal"
          modalId="unique-modal-id"
          handleActions={handleModalActions}
        >
          <p>Modal content here</p>
        </CNewMiniModal>
      )}
    </>
  );
};
```

### Nested Modals Example

```tsx
const NestedModalsExample = () => {
  const [firstModalOpen, setFirstModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setFirstModalOpen(true)}>Open First Modal</button>
      
      {firstModalOpen && (
        <CNewMiniModal
          title="First Modal"
          modalId="first-modal"
          handleActions={(action) => {
            if (action === 'Close') setFirstModalOpen(false);
          }}
        >
          <button onClick={() => setSecondModalOpen(true)}>
            Open Second Modal
          </button>
        </CNewMiniModal>
      )}
      
      {secondModalOpen && (
        <CNewMiniModal
          title="Second Modal"
          modalId="second-modal"
          handleActions={(action) => {
            if (action === 'Close') setSecondModalOpen(false);
          }}
        >
          <p>This is a nested modal</p>
        </CNewMiniModal>
      )}
    </>
  );
};
```

## API

### useModalManager(modalId: string, closeHandler: () => void)

#### Parameters

- `modalId` (string): Unique identifier for the modal
- `closeHandler` (function): Function to call when the modal should close

#### Returns

- `zIndex` (number): The z-index value for the modal
- `isTopModal` (function): Returns true if this modal is the topmost modal
- `modalCount` (number): Total number of open modals

## How It Works

1. **Modal Registration**: When a modal mounts, it registers itself with the global modal manager
2. **Z-Index Assignment**: Each modal gets a unique z-index value (starting from 100)
3. **Escape Key Handling**: A global event listener handles Escape key presses
4. **Top Modal Detection**: Only the topmost modal responds to Escape key presses
5. **Cleanup**: When a modal unmounts, it unregisters itself from the manager

## Best Practices

1. **Unique Modal IDs**: Always provide unique modal IDs to avoid conflicts
2. **Proper Cleanup**: The hook automatically handles cleanup, but ensure your close handlers are properly implemented
3. **Consistent Close Actions**: Use consistent action names (e.g., "Close") across your modals
4. **Backdrop Z-Index**: Set backdrop z-index to `zIndex - 1` for proper layering

## Integration with Existing Components

The modal manager has been integrated into:
- `CNewMiniModal`
- `CNewModal`

These components now automatically support escape key handling and proper z-index management when used with the `modalId` prop. 