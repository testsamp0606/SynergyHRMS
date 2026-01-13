
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

        if (punchInTime && !isSameDay(punchInTime, now)) {
          // If the last punch-in was on a different day, reset for a new day.
          set({ punchInTime: now, punchOutTime: null });
        } else if (!punchInTime) {
          // If there's no punch-in time at all, set it.
          set({ punchInTime: now, punchOutTime: null });
        }
        // If already punched in today, do nothing.
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
