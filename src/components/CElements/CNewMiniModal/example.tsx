import React, { useState } from "react";
import CNewMiniModal from "./index";
import CNewModal from "../CNewModal";

// Example component demonstrating nested modals with escape key handling
export const ModalExample: React.FC = () => {
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
  const [isSecondMiniModalOpen, setIsSecondMiniModalOpen] = useState(false);

  const handleMainModalActions = (action: string) => {
    if (action === "close") {
      setIsMainModalOpen(false);
    }
  };

  const handleMiniModalActions = (action: string) => {
    if (action === "Close") {
      setIsMiniModalOpen(false);
    }
  };

  const handleSecondMiniModalActions = (action: string) => {
    if (action === "Close") {
      setIsSecondMiniModalOpen(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Nested Modal Example</h1>

      <div className="space-y-4">
        <button
          onClick={() => setIsMainModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Main Modal
        </button>

        <p className="text-sm text-gray-600">
          Press Escape to close the topmost modal. The last opened modal will
          close first.
        </p>
      </div>

      {/* Main Modal (CNewModal) */}
      {isMainModalOpen && (
        <CNewModal
          title="Main Modal"
          modalId="main-modal"
          handleActions={handleMainModalActions}
        >
          <div className="space-y-4">
            <p>This is the main modal (CNewModal). Press Escape to close it.</p>
            <button
              onClick={() => setIsMiniModalOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Open Mini Modal Inside
            </button>
          </div>
        </CNewModal>
      )}

      {/* Mini Modal (CNewMiniModal) */}
      {isMiniModalOpen && (
        <CNewMiniModal
          title="Mini Modal"
          modalId="mini-modal"
          handleActions={handleMiniModalActions}
        >
          <div className="space-y-4">
            <p>
              This is a mini modal inside the main modal. Press Escape to close
              it.
            </p>
            <button
              onClick={() => setIsSecondMiniModalOpen(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Open Another Mini Modal
            </button>
          </div>
        </CNewMiniModal>
      )}

      {/* Second Mini Modal */}
      {isSecondMiniModalOpen && (
        <CNewMiniModal
          title="Second Mini Modal"
          modalId="second-mini-modal"
          handleActions={handleSecondMiniModalActions}
        >
          <div className="space-y-4">
            <p>This is the second mini modal. Press Escape to close it.</p>
            <p className="text-sm text-gray-600">
              When you press Escape, this modal will close first, then the first
              mini modal, then the main modal.
            </p>
          </div>
        </CNewMiniModal>
      )}
    </div>
  );
};
