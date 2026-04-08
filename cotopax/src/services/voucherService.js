const STORAGE_KEY = "cotopax_vouchers"

export const getVouchers = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveVouchers = (vouchers) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vouchers))
}

export const createVoucher = ({ employeeName, amount, category, expiryDate }) => ({
  id: Date.now().toString(),
  employeeName,
  amount: parseFloat(amount),
  category,
  expiryDate,
  status: "Active",
  createdAt: new Date().toISOString(),
  usedAt: null,
  merchant: null,
})