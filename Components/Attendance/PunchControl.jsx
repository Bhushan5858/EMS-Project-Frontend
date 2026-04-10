import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, Clock, Loader2, Zap } from "lucide-react";
import { useAttendanceStore } from "../../src/Store/useAttendanceStore";
import { useTranslation } from "react-i18next";

const PunchControl = () => {
  const { t } = useTranslation();
  const { currentDayRecord, punch, isLoading } = useAttendanceStore();
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  const isPunchedIn = currentDayRecord?.isPunchedIn;

  useEffect(() => {
    let interval;
    if (isPunchedIn && currentDayRecord?.logs?.length > 0) {
      const lastLog = currentDayRecord.logs[currentDayRecord.logs.length - 1];
      const startTime = new Date(lastLog.punchIn);

      interval = setInterval(() => {
        const now = new Date();
        const diffMs = now - startTime;
        
        const hours = Math.floor(diffMs / 3600000);
        const minutes = Math.floor((diffMs % 3600000) / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);

        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    } else {
      setElapsedTime("00:00:00");
    }
    return () => clearInterval(interval);
  }, [isPunchedIn, currentDayRecord]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden group bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700"
    >
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all duration-700"></div>
      
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-teal-600 dark:text-teal-400 font-black uppercase tracking-widest text-xs">
            <Zap size={14} className="animate-pulse" />
            {t('attendance.terminalStatus')}
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
            {isPunchedIn ? t('attendance.currentlyActive') : t('attendance.systemStandby')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {isPunchedIn ? t('attendance.activeDesc') : t('attendance.standbyDesc')}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            {isPunchedIn && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-2 text-3xl font-black font-mono text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-6 py-3 rounded-2xl border border-teal-100 dark:border-teal-700 shadow-inner">
                  <Clock size={24} />
                  {elapsedTime}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                   {t('attendance.currentSession')}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={punch}
            disabled={isLoading}
            className={`
              relative w-48 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl flex items-center justify-center gap-3
              ${isPunchedIn 
                ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20" 
                : "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/20"
              }
              ${isLoading ? "opacity-70 cursor-wait" : ""}
            `}
          >
            {isLoading ? (
              <Loader2 className="animate-spin size-5" />
            ) : isPunchedIn ? (
              <>
                <LogOut size={18} />
                {t('attendance.punchOut')}
              </>
            ) : (
              <>
                <LogIn size={18} />
                {t('attendance.punchIn')}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PunchControl;
