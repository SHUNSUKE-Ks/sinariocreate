import { useEffect } from 'react';

const useKeyMapManager = ({ isEnabled, onAction, maxSlots = 9 }) => {

  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e) => {
      if (e.altKey && e.key >= '1' && e.key <= maxSlots.toString()) {
        e.preventDefault();
        const index = parseInt(e.key, 10) - 1;
        onAction(`select:${index}`);
      }

      // Add new key mappings for recording
      if ((e.altKey && e.key === 'd') || e.key === 'CapsLock') {
        e.preventDefault();
        onAction('start_recording');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, onAction, maxSlots]);

};

export default useKeyMapManager;
