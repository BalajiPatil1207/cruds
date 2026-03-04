import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { Plus, Edit, Trash2, IndianRupee, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

const IncomeIndex = () => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchIncomes = async () => {
        try {
            setLoading(true);
            const response = await api.get('/income');
            if (response.data.success) {
                setIncomes(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching incomes:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteIncome = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await api.delete(`/income/delete/${id}`);
                fetchIncomes();
                toast.success("Delete income successfully")
            } catch (error) {
                alert("Error deleting record", error);
            }
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Income Dashboard</h2>
                        <p className="text-gray-500 mt-1">Track and manage your revenue sources</p>
                    </div>
                    <Link 
                        to="/income/create" 
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95"
                    >
                        <Plus size={20} /> Add New Income
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Transactions</p>
                        <h3 className="text-3xl font-bold text-blue-600 mt-2">{incomes.length}</h3>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Source</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Note</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                                Loading records...
                                            </div>
                                        </td>
                                    </tr>
                                ) : incomes.length > 0 ? (
                                    incomes.map((item) => (
                                        <tr key={item.income_id} className="hover:bg-gray-50/80 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-gray-900">{item.source}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg">
                                                    <IndianRupee size={14} className="mr-0.5" /> 
                                                    {Number(item.amount).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-500 text-sm block max-w-[200px] truncate">
                                                    {item.note || '---'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                                    <Link 
                                                        to={`/income/edit/${item.income_id}`} 
                                                        className="p-2 text-amber-500 hover:bg-amber-50 transition-colors border-r border-gray-100"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => deleteIncome(item.income_id)} 
                                                        className="p-2 text-red-500 hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                            No income records found. Start by adding one!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeIndex;