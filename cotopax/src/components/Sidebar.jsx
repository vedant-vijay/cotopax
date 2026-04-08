import { NavLink } from "react-router-dom"

const navItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/vouchers", label: "Vouchers", icon: "🎟️" },
  { path: "/analytics", label: "Analytics", icon: "📈" },
]

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600">🏦 Cotopax</h1>
        <p className="text-xs text-gray-400 mt-1">Voucher Management</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">Cotopax v1.0</p>
      </div>
    </div>
  )
}

export default Sidebar