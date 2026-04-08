export const resolveStatus = (voucher) => {
  if (voucher.status === "Used") return "Used"
  const today = new Date()
  const expiry = new Date(voucher.expiryDate)
  return expiry < today ? "Expired" : "Active"
}

export const applyExpiry = (vouchers) => {
  return vouchers.map((v) => ({
    ...v,
    status: resolveStatus(v),
  }))
}

export const getStats = (vouchers) => {
  const total = vouchers.length
  const used = vouchers.filter((v) => v.status === "Used").length
  const expired = vouchers.filter((v) => v.status === "Expired").length
  const active = vouchers.filter((v) => v.status === "Active").length
  const totalAmount = vouchers.reduce((sum, v) => sum + v.amount, 0)
  const usedAmount = vouchers
    .filter((v) => v.status === "Used")
    .reduce((sum, v) => sum + v.amount, 0)

  return { total, used, expired, active, totalAmount, usedAmount }
}