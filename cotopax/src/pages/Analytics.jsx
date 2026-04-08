import { useState, useEffect } from "react"
import { getVouchers } from "../services/voucherService"
import { applyExpiry } from "../utils/voucherUtils"
import { CATEGORY_COLORS } from "../data/constants"
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts"

const Analytics = () => {
  const [vouchers, setVouchers] = useState([])

  useEffect(() => {
    const data = getVouchers()
    setVouchers(applyExpiry(data))
  }, [])

  // Pie chart data — category wise voucher count
  const categoryData = Object.keys(CATEGORY_COLORS).map((cat) => ({
    name: cat,
    value: vouchers.filter((v) => v.category === cat).length
  })).filter((d) => d.value > 0)

  // Bar chart data — issued vs used per category
  const barData = Object.keys(CATEGORY_COLORS).map((cat) => ({
    name: cat,
    Issued: vouchers.filter((v) => v.category === cat).length,
    Used: vouchers.filter((v) => v.category === cat && v.status === "Used").length,
  })).filter((d) => d.Issued > 0)

  // Smart insight
  const topCategory = categoryData.sort((a, b) => b.value - a.value)[0]

  if (vouchers.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full text-gray-400">
        <p className="text-4xl mb-3">📈</p>
        <p className="text-sm">No data yet. Create some vouchers first!</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Analytics</h1>
      <p className="text-gray-400 text-sm mb-8">Visual breakdown of voucher usage</p>

      {/* Smart Insight Banner */}
      {topCategory && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-8 flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-sm font-semibold text-indigo-700">Smart Insight</p>
            <p className="text-sm text-indigo-500">
              Most vouchers are issued for <strong>{topCategory.name}</strong> — consider reviewing your {topCategory.name.toLowerCase()} policy.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 mb-6">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 mb-6">Issued vs Used</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Issued" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Used" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Analytics