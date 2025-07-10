import { useEffect, useRef, useCallback } from "react";

interface ModalInstance {
  id: string;
  closeHandler: () => void;
  zIndex: number;
}

class ModalManager {
  private modals: ModalInstance[] = [];
  private nextZIndex = 100;

  addModal(id: string, closeHandler: () => void): number {
    const zIndex = this.nextZIndex++;
    this.modals.push({ id, closeHandler, zIndex });
    return zIndex;
  }

  removeModal(id: string): void {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  getTopModal(): ModalInstance | null {
    return this.modals.length > 0 ? this.modals[this.modals.length - 1] : null;
  }

  closeTopModal(): void {
    const topModal = this.getTopModal();
    if (topModal) {
      topModal.closeHandler();
    }
  }

  getModalCount(): number {
    return this.modals.length;
  }
}

// Global modal manager instance
const globalModalManager = new ModalManager();

export const useModalManager = (modalId: string, closeHandler: () => void) => {
  const zIndexRef = useRef<number>(0);

  const registerModal = useCallback(() => {
    zIndexRef.current = globalModalManager.addModal(modalId, closeHandler);
  }, [modalId, closeHandler]);

  const unregisterModal = useCallback(() => {
    globalModalManager.removeModal(modalId);
  }, [modalId]);

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const topModal = globalModalManager.getTopModal();
        if (topModal && topModal.id === modalId) {
          event.preventDefault();
          event.stopPropagation();
          closeHandler();
        }
      }
    },
    [modalId, closeHandler]
  );

  useEffect(() => {
    registerModal();

    // Add escape key listener
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      unregisterModal();
    };
  }, [registerModal, unregisterModal, handleEscapeKey]);

  return {
    zIndex: zIndexRef.current,
    isTopModal: globalModalManager.getTopModal()?.id === modalId,
    modalCount: globalModalManager.getModalCount(),
  };
};
