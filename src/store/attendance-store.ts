import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AttendanceState {
  punchInTime: Date | null;
  punchOutTime: Date | null;
  punchIn: () => void;
  punchOut: () => void;
  reset: () => void;
}

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set) => ({
      punchInTime: null,
      punchOutTime: null,
      punchIn: () => set({ punchInTime: new Date(), punchOutTime: null }),
      punchOut: () => set({ punchOutTime: new Date() }),
      reset: () => set({ punchInTime: null, punchOutTime: null }),
    }),
    {
      name: 'attendance-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage, {
        // Custom reviver to restore Date objects
        reviver: (key, value) => {
          if (key === 'punchInTime' || key === 'punchOutTime') {
            return value ? new Date(value as string) : null;
          }
          return value;
        },
      }),
    }
  )
);

// This is a simple daily reset logic. 
// In a real app, you might want a more robust solution, maybe server-driven.
const today = new Date().toLocaleDateString();
const lastResetDay = localStorage.getItem('last-attendance-reset-day');

if (today !== lastResetDay) {
  useAttendanceStore.getState().reset();
  localStorage.setItem('last-attendance-reset-day', today);
}
