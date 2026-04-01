import { AlertTriangle, Trash2 } from "lucide-react";

const DeleteUserModal = ({ isOpen, onClose, onConfirm, user }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white w-full max-w-sm p-8 rounded-[2rem] shadow-2xl animate-in zoom-in duration-300">

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-6 shadow-sm">
                        <AlertTriangle size={32} />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">
                        Confirm Deletion
                    </h2>

                    <p className="text-slate-500 leading-relaxed mb-8">
                        Are you sure you want to remove <span className="font-bold text-slate-800 text-base">{user?.name}</span> from the system? This action cannot be undone.
                    </p>

                    <div className="flex w-full gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all active:scale-95"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-rose-600 text-white font-bold shadow-lg shadow-rose-100 hover:bg-rose-500 transition-all active:scale-95"
                        >
                            <Trash2 size={18} />
                            Delete
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DeleteUserModal;