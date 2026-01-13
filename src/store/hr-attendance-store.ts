import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AttendanceState {
  punchInTime: Date | null;
  punchOutTime: Date | null;
  punchIn: () => void;
  punchOut: () => void;
  reset: () => void;
}

export const useHrAttendanceStore = create<AttendanceState>()(
  persist(
    (set) => ({
      punchInTime: null,
      punchOutTime: null,
      punchIn: () => set({ punchInTime: new Date(), punchOutTime: null }),
      punchOut: () => set({ punchOutTime: new Date() }),
      reset: () => set({ punchInTime: null, punchOutTime: null }),
    }),
    {
      name: 'hr-attendance-storage', 
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
