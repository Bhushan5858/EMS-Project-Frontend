import { useEffect } from "react";
import { useAuthUserStore } from "../src/Store/useAuthUserStore";
import {
    User,
    Mail,
    Shield,
    Building2,
    Briefcase,
    DollarSign,
    Calendar,
} from "lucide-react";

const Profile = () => {
    const { authUser, getProfile } = useAuthUserStore();

    useEffect(() => {
        getProfile();
    }, []);

    if (!authUser) {
        return (
            <div className="flex-1 flex items-center justify-center bg-slate-100">
                <div className="animate-pulse text-slate-500 text-lg">
                    Loading Profile...
                </div>
            </div>
        );
    }

    const InfoCard = ({ icon: Icon, label, value }) => (
        <div className="p-5 rounded-2xl bg-white/60 backdrop-blur-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-2">
                <Icon size={18} className="text-teal-600" />
                <p className="text-xs uppercase text-slate-400">{label}</p>
            </div>
            <p className="text-sm font-semibold text-slate-700">
                {value || "Not Assigned"}
            </p>
        </div>
    );

    return (
        <div className="flex-1 p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
                    <p className="text-slate-500">
                        Manage your account information
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE PROFILE CARD */}
                    <div className="lg:col-span-1">
                        <div className="relative bg-gradient-to-br from-teal-500 via-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl overflow-hidden">

                            {/* Glow */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                            <div className="flex flex-col items-center relative z-10">
                                <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                                    <User size={50} />
                                </div>

                                <h2 className="text-2xl font-bold mt-4">
                                    {authUser.name}
                                </h2>

                                <p className="text-sm opacity-80">
                                    {authUser.email}
                                </p>

                                <div className="flex gap-2 mt-4">
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs uppercase">
                                        {authUser.role}
                                    </span>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs ${authUser.isActive
                                                ? "bg-green-400/80"
                                                : "bg-red-400/80"
                                            }`}
                                    >
                                        {authUser.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* ACCOUNT INFO */}
                        <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl border border-white/30">
                            <div className="p-6 border-b border-slate-200">
                                <h3 className="text-sm font-semibold text-slate-600 uppercase">
                                    Account Details
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                                <InfoCard icon={User} label="Full Name" value={authUser.name} />
                                <InfoCard icon={Mail} label="Email" value={authUser.email} />
                                <InfoCard icon={Shield} label="Role" value={authUser.role} />
                            </div>
                        </div>

                        {/* EMPLOYEE INFO */}
                        {authUser.isEmployee && (
                            <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl border border-white/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="p-6 border-b border-slate-200">
                                    <h3 className="text-sm font-semibold text-slate-600 uppercase">
                                        Job Information
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                                    <InfoCard
                                        icon={Building2}
                                        label="Department"
                                        value={authUser.departmentId?.name}
                                    />
                                    <InfoCard
                                        icon={Briefcase}
                                        label="Position"
                                        value={authUser.position}
                                    />
                                    <InfoCard
                                        icon={Calendar}
                                        label="Joining Date"
                                        value={
                                            authUser.joiningDate
                                                ? new Date(authUser.joiningDate).toLocaleDateString()
                                                : "Pending"
                                        }
                                    />
                                </div>

                                {/* SALARY HIGHLIGHT */}
                                <div className="px-6 pb-6">
                                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg">
                                        <p className="text-xs uppercase opacity-80">
                                            Monthly Salary
                                        </p>
                                        <h2 className="text-2xl font-bold mt-1">
                                            {authUser.salary
                                                ? `₹${authUser.salary.toLocaleString()}`
                                                : "Not Disclosed"}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ONBOARDING */}
                        {!authUser.isEmployee && authUser.role !== "admin" && (
                            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 shadow-sm">
                                <h4 className="font-semibold text-amber-800">
                                    Onboarding in Progress
                                </h4>
                                <p className="text-sm text-amber-700 mt-1">
                                    You are not assigned to a department yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;