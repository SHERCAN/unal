import { useRef, useCallback, useEffect } from 'react';

interface UseTouchDragDropOptions {
    onDragStart: (itemId: string) => void;
    onDrop: (itemId: string, dropZoneId: string) => void;
    onDragEnd: () => void;
    ghostClass?: string;
    disabled?: boolean;
}

interface DragState {
    itemId: string;
    ghost: HTMLElement | null;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
    started: boolean;
    sourceElement: HTMLElement;
}

export function useTouchDragDrop(options: UseTouchDragDropOptions) {
    const { onDragStart, onDrop, onDragEnd, disabled = false } = options;
    const dragStateRef = useRef<DragState | null>(null);

    const createGhost = useCallback((source: HTMLElement, x: number, y: number, offsetX: number, offsetY: number) => {
        const ghost = source.cloneNode(true) as HTMLElement;
        ghost.style.position = 'fixed';
        ghost.style.zIndex = '99999';
        ghost.style.pointerEvents = 'none';
        ghost.style.opacity = '0.85';
        ghost.style.transform = 'scale(1.1)';
        ghost.style.transition = 'none';
        ghost.style.width = `${source.offsetWidth}px`;
        ghost.style.height = `${source.offsetHeight}px`;
        ghost.style.left = `${x - offsetX}px`;
        ghost.style.top = `${y - offsetY}px`;
        ghost.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)';
        ghost.style.borderRadius = '8px';
        document.body.appendChild(ghost);
        return ghost;
    }, []);

    // Global cleanup for safe unmount
    useEffect(() => {
        return () => {
            if (dragStateRef.current?.ghost) {
                dragStateRef.current.ghost.remove();
            }
        };
    }, []);

    const handleTouchStart = useCallback((itemId: string, e: React.TouchEvent) => {
        if (disabled) return;
        const touch = e.touches[0];
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        dragStateRef.current = {
            itemId,
            ghost: null,
            startX: touch.clientX,
            startY: touch.clientY,
            offsetX: touch.clientX - rect.left,
            offsetY: touch.clientY - rect.top,
            started: false,
            sourceElement: target,
        };

        // Attach global non-passive listeners immediately when touch starts
        const handleTouchMoveGlobal = (moveEvent: TouchEvent) => {
            const state = dragStateRef.current;
            if (!state) return;

            const moveTouch = moveEvent.touches[0];
            const dx = moveTouch.clientX - state.startX;
            const dy = moveTouch.clientY - state.startY;

            if (!state.started && Math.abs(dx) + Math.abs(dy) < 10) return;

            // PREVENT SCROLLING - This works now because the listener is non-passive
            if (moveEvent.cancelable) moveEvent.preventDefault();

            if (!state.started) {
                state.started = true;
                state.ghost = createGhost(state.sourceElement, moveTouch.clientX, moveTouch.clientY, state.offsetX, state.offsetY);
                state.sourceElement.style.opacity = '0.3';
                onDragStart(state.itemId);
            }

            if (state.ghost) {
                state.ghost.style.left = `${moveTouch.clientX - state.offsetX}px`;
                state.ghost.style.top = `${moveTouch.clientY - state.offsetY}px`;
            }

            const elemBelow = document.elementFromPoint(moveTouch.clientX, moveTouch.clientY);
            document.querySelectorAll('[data-drop-zone]').forEach(el => (el as HTMLElement).style.outline = '');
            if (elemBelow) {
                const dropZone = elemBelow.closest('[data-drop-zone]') as HTMLElement | null;
                if (dropZone) {
                    dropZone.style.outline = '3px solid #8b5cf6';
                    dropZone.style.outlineOffset = '2px';
                }
            }
        };

        const handleTouchEndGlobal = (endEvent: TouchEvent) => {
            const state = dragStateRef.current;
            if (!state) {
                cleanup();
                return;
            }

            state.sourceElement.style.opacity = '';
            document.querySelectorAll('[data-drop-zone]').forEach(el => {
                (el as HTMLElement).style.outline = '';
                (el as HTMLElement).style.outlineOffset = '';
            });

            if (state.started) {
                const finalTouch = endEvent.changedTouches[0];
                if (state.ghost) state.ghost.style.display = 'none';

                const elements = document.elementsFromPoint(finalTouch.clientX, finalTouch.clientY);
                let dropZone: HTMLElement | null = null;
                for (const el of elements) {
                    const dz = (el as HTMLElement).closest('[data-drop-zone]') as HTMLElement | null;
                    if (dz) {
                        dropZone = dz;
                        break;
                    }
                }

                if (dropZone) {
                    onDrop(state.itemId, dropZone.getAttribute('data-drop-zone')!);
                } else {
                    onDragEnd();
                }

                if (state.ghost) state.ghost.remove();
            }

            dragStateRef.current = null;
            cleanup();
        };

        const cleanup = () => {
            window.removeEventListener('touchmove', handleTouchMoveGlobal);
            window.removeEventListener('touchend', handleTouchEndGlobal);
            window.removeEventListener('touchcancel', handleTouchEndGlobal);
        };

        window.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
        window.addEventListener('touchend', handleTouchEndGlobal, { passive: false });
        window.addEventListener('touchcancel', handleTouchEndGlobal, { passive: false });

    }, [disabled, onDragStart, onDrop, onDragEnd, createGhost]);

    const touchHandlers = useCallback((itemId: string) => ({
        onTouchStart: (e: React.TouchEvent) => handleTouchStart(itemId, e),
    }), [handleTouchStart]);

    return { touchHandlers };
}
