import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AttendanceState {
  punchInTime: Date | null;
  punchOutTime: Date | null;
  punchIn: () => void;
  punchOut: () => void;
  reset: () => void;
}

export const useManagerAttendanceStore = create<AttendanceState>()(
  persist(
    (set) => ({
      punchInTime: null,
      punchOutTime: null,
      punchIn: () => set({ punchInTime: new Date(), punchOutTime: null }),
      punchOut: () => set({ punchOutTime: new Date() }),
      reset: () => set({ punchInTime: null, punchOutTime: null }),
    }),
    {
      name: 'manager-attendance-storage',
      storage: createJSONStorage(() => localStorage, {
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

const today = new Date().toLocaleDateString();
const lastResetDay = localStorage.getItem('last-manager-attendance-reset-day');

if (today !== lastResetDay) {
  useManagerAttendanceStore.getState().reset();
  localStorage.setItem('last-manager-attendance-reset-day', today);
}
