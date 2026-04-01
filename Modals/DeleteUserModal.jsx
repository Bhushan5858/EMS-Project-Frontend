import { X, ShieldAlert, AlertTriangle, UserMinus } from "lucide-react";

/** Professional corporate-grade user deletion modal */
const DeleteUserModal = ({ isOpen, onClose, onConfirm, userName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-rose-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-rose-600 text-white shadow-md shadow-rose-900/10">
                            <ShieldAlert size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-rose-900 tracking-tight">Deprovision User</h2>
                            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Permanent Termination</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-rose-100/50 text-rose-300 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner">
                            <UserMinus size={32} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800 leading-relaxed">
                                You are about to terminate the profile of <span className="text-rose-600 font-black">{userName}</span>.
                            </p>
                            <p className="text-[11px] text-slate-400 font-bold mt-2 leading-relaxed">
                                This action is irreversible and will permanently disconnect this user from the EMS corporate terminal and its divisional structure.
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col gap-3">
                        <button
                            onClick={onConfirm}
                            className="w-full py-4 rounded-xl bg-slate-900 text-rose-500 font-black text-xs tracking-widest uppercase hover:bg-rose-600 hover:text-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            <UserMinus size={16} />
                            Authorize Termination
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-4 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs tracking-widest uppercase hover:bg-slate-100 transition-all active:scale-95"
                        >
                            Cancel Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;