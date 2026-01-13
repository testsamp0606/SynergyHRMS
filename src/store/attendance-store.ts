
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { isSameDay } from 'date-fns';

interface AttendanceState {
  punchInTime: Date | null;
  punchOutTime: Date | null;
  punchIn: () => void;
  punchOut: () => void;
  reset: () => void;
}

const createAttendanceStore = (name: string) => create<AttendanceState>()(
  persist(
    (set, get) => ({
      punchInTime: null,
      punchOutTime: null,
      punchIn: () => {
        const { punchInTime } = get();
        const now = new Date();
        // Reset if the last punch-in was not today
        if (punchInTime && !isSameDay(punchInTime, now)) {
          set({ punchInTime: now, punchOutTime: null });
        } else {
          set({ punchInTime: now, punchOutTime: null });
        }
      },
      punchOut: () => set({ punchOutTime: new Date() }),
      reset: () => set({ punchInTime: null, punchOutTime: null }),
    }),
    {
      name: `${name}-attendance-storage`,
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

export const useAttendanceStore = createAttendanceStore('employee');
export const useHrAttendanceStore = createAttendanceStore('hr');
export const useManagerAttendanceStore = createAttendanceStore('manager');
