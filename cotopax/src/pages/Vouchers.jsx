import { useState, useEffect } from "react"
import { getVouchers, saveVouchers, createVoucher } from "../services/voucherService"
import { applyExpiry } from "../utils/voucherUtils"
import { CATEGORIES } from "../data/constants"

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([])
  const [form, setForm] = useState({
    employeeName: "",
    amount: "",
    category: "",
    expiryDate: ""
  })

  useEffect(() => {
    const data = getVouchers()
    setVouchers(applyExpiry(data))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newVoucher = createVoucher(form)
    const updated = [...vouchers, newVoucher]
    saveVouchers(updated)
    setVouchers(updated)
    setForm({ employeeName: "", amount: "", category: "", expiryDate: "" })
  }

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Vouchers</h1>
        <p className="text-gray-400 text-sm mb-8">Create and manage vouchers</p>

        {/* Form */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Create Voucher</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Employee Name</label>
                <input
                name="employeeName"
                value={form.employeeName}
                onChange={handleChange}
                required
                placeholder="e.g. Rahul Sharma"
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Amount (₹)</label>
                <input
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                type="number"
                placeholder="e.g. 500"
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Category</label>
                <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Expiry Date</label>
                <input
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                required
                type="date"
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
            </div>

            <button
                type="submit"
                className="col-span-2 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all"
            >
                Create Voucher
            </button>
            </form>
        </div>

        {/* Voucher List */}
        {vouchers.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🎟️</p>
            <p className="text-sm">No vouchers yet. Create one above!</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 gap-4">
            {vouchers.map((v) => (
                <div key={v.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                    <div>
                    <p className="font-semibold text-gray-800">{v.employeeName}</p>
                    <p className="text-xs text-gray-400">{v.category}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    v.status === "Active" ? "bg-green-100 text-green-600" :
                    v.status === "Used" ? "bg-blue-100 text-blue-600" :
                    "bg-red-100 text-red-600"
                    }`}>
                    {v.status}
                    </span>
                </div>
                <p className="text-2xl font-bold text-gray-800">₹{v.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">Expires: {v.expiryDate}</p>
                </div>
            ))}
            </div>
        )}
        </div>
    )
}

export default Vouchers
