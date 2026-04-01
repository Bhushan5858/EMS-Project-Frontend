import { useState } from "react";
import { useDepartmentStore } from "../src/Store/useDepartmentStore";
import { Building2, PlusCircle, X } from "lucide-react";

const AddDepartmentModal = ({ isOpen, onClose }) => {

    const { addDepartment } = useDepartmentStore();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        const success = await addDepartment({ name });
        setLoading(false);

        if (success) {
            setName("");
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in duration-300 relative border border-slate-100">
                
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl text-slate-300 hover:text-slate-600 hover:bg-slate-50 transition-all">
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-2xl bg-teal-50 text-teal-600">
                        <Building2 size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                        New Department
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Official Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Engineering, Sales..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-slate-800 font-medium placeholder:text-slate-300"
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
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-teal-600 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-teal-100 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <PlusCircle size={18} />
                                    Create
                                </>
                            )}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddDepartmentModal;