import { useState, useEffect } from "react"
import { getVouchers } from "../services/voucherService"
import { applyExpiry, getStats } from "../utils/voucherUtils"

const Dashboard = () => {
  const [vouchers, setVouchers] = useState([])

  useEffect(() => {
    const data = getVouchers()
    const updated = applyExpiry(data)
    setVouchers(updated)
  }, [])

  const stats = getStats(vouchers)

  const cards = [
    { label: "Total Vouchers", value: stats.total, bg: "bg-indigo-50", color: "text-indigo-600", icon: "🎟️" },
    { label: "Active", value: stats.active, bg: "bg-green-50", color: "text-green-600", icon: "✅" },
    { label: "Used", value: stats.used, bg: "bg-blue-50", color: "text-blue-600", icon: "💸" },
    { label: "Expired", value: stats.expired, bg: "bg-red-50", color: "text-red-600", icon: "�expired️" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Welcome back! Here's what's happening.</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className={`${card.bg} rounded-2xl p-6`}>
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className={`text-4xl font-bold ${card.color}`}>{card.value}</div>
            <div className="text-gray-500 text-sm mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-500 mb-1">Total Amount Issued</h2>
        <p className="text-3xl font-bold text-gray-800">₹{stats.totalAmount.toLocaleString()}</p>
        <p className="text-sm text-gray-400 mt-1">₹{stats.usedAmount.toLocaleString()} used so far</p>
      </div>
    </div>
  )
}

export default Dashboard