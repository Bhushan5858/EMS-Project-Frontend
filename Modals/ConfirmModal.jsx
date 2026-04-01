import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 animate-in zoom-in duration-300 relative border border-slate-100 overflow-hidden">
                
                {/* Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>

                <button onClick={onCancel} className="absolute top-6 right-6 p-2 rounded-xl text-slate-300 hover:text-slate-600 hover:bg-slate-50 transition-all">
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                        <AlertTriangle size={32} />
                    </div>

                    <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
                        {title}
                    </h2>

                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                        {message}
                    </p>

                    <div className="flex w-full gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 transition-all active:scale-95"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            className="flex-1 px-6 py-4 rounded-2xl bg-rose-600 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-rose-100 hover:bg-rose-500 transition-all active:scale-95"
                        >
                            Confirm Action
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ConfirmModal;