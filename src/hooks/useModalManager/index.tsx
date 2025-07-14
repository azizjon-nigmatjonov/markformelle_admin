import { useEffect, useRef, useCallback } from "react";

interface ModalInstance {
  id: string;
  closeHandler: () => void;
  zIndex: number;
  timestamp: number; // Add timestamp to track opening order
}

class ModalManager {
  private modals: ModalInstance[] = [];
  private nextZIndex = 100;

  addModal(id: string, closeHandler: () => void): number {
    const zIndex = this.nextZIndex++;
    const timestamp = Date.now();
    this.modals.push({ id, closeHandler, zIndex, timestamp });
    return zIndex;
  }

  removeModal(id: string): void {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  getTopModal(): ModalInstance | null {
    return this.modals.length > 0 ? this.modals[this.modals.length - 1] : null;
  }

  getMostRecentModal(): ModalInstance | null {
    if (this.modals.length === 0) return null;

    // Find the modal with the highest timestamp (most recently opened)
    return this.modals.reduce((mostRecent, current) =>
      current.timestamp > mostRecent.timestamp ? current : mostRecent
    );
  }

  closeTopModal(): void {
    const topModal = this.getTopModal();
    if (topModal) {
      topModal.closeHandler();
    }
  }

  closeMostRecentModal(): void {
    const mostRecentModal = this.getMostRecentModal();
    if (mostRecentModal) {
      mostRecentModal.closeHandler();
    }
  }

  getModalCount(): number {
    return this.modals.length;
  }

  isTopModal(modalId: string): boolean {
    const topModal = this.getTopModal();
    return topModal?.id === modalId;
  }

  isMostRecentModal(modalId: string): boolean {
    const mostRecentModal = this.getMostRecentModal();
    return mostRecentModal?.id === modalId;
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
        // Only handle escape if this modal is the most recently opened one
        if (globalModalManager.isMostRecentModal(modalId)) {
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
    isTopModal: globalModalManager.isTopModal(modalId),
    isMostRecentModal: globalModalManager.isMostRecentModal(modalId),
    modalCount: globalModalManager.getModalCount(),
  };
};
