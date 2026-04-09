import { useState, useEffect } from "react";
import { useDepartmentStore } from "../src/Store/useDepartmentStore";
import { useAuthUserStore } from "../src/Store/useAuthUserStore";
import { Settings2, X, CheckCircle2 } from "lucide-react";

const UpdateDepartmentModal = ({ isOpen, onClose, department }) => {

    const { updateDepartment } = useDepartmentStore();
    const { authUser } = useAuthUserStore();
    const role = authUser?.role;

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (department) {
            setName(department.name || "");
        }
    }, [department]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        const success = await updateDepartment(department._id, { name });
        setLoading(false);

        if (success) {
            onClose();
        }
    };

    return (
        <div className="bg-white rounded-2xl sm:rounded-[2.5rem] w-full max-w-md p-5 sm:p-8 shadow-2xl animate-in zoom-in duration-300 relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            
            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl text-slate-300 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                    <Settings2 size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                    Update Division
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Department Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter department name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-slate-800 font-bold placeholder:text-slate-300"
                        required
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 transition-all active:scale-95"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading || !name.trim()}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-indigo-100 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <CheckCircle2 size={18} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateDepartmentModal;