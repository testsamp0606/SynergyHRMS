"use client";

import { create } from 'zustand';
import { intervalToDuration, formatDuration } from 'date-fns';
import { useEffect, useState } from 'react';

interface AttendanceState {
  punchInTime: Date | null;
  punchOutTime: Date | null;
  isPunchedIn: boolean;
  handlePunch: () => void;
  getElapsedTime: () => string;
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  punchInTime: null,
  punchOutTime: null,
  isPunchedIn: false,
  handlePunch: () => {
    const now = new Date();
    if (!get().isPunchedIn) {
      set({ punchInTime: now, isPunchedIn: true, punchOutTime: null });
    } else {
      set({ punchOutTime: now, isPunchedIn: false });
    }
  },
  getElapsedTime: () => {
    const { punchInTime, punchOutTime } = get();
    if (!punchInTime) return "0h 0m";
    
    const end = punchOutTime || new Date();
    const duration = intervalToDuration({ start: punchInTime, end });
    
    return formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] })
      .replace(' seconds', 's')
      .replace(' minutes', 'm')
      .replace(' hours', 'h')
      .replace(/ 0s$/, '')
      .trim() || '0s';
  }
}));

// A hook to force re-renders for the elapsed time display
export const useElapsedTimeUpdater = () => {
  const { isPunchedIn, punchOutTime, getElapsedTime } = useAttendanceStore();
  const [elapsed, setElapsed] = useState(getElapsedTime());

  useEffect(() => {
    if (isPunchedIn && !punchOutTime) {
      const intervalId = setInterval(() => {
        setElapsed(getElapsedTime());
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      // Set one last time when punched out
      setElapsed(getElapsedTime());
    }
  }, [isPunchedIn, punchOutTime, getElapsedTime]);

  return elapsed;
};
