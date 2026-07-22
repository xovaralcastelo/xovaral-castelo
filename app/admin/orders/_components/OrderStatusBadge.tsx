import {
  ORDER_STATUS_LABELS,
  type OrderPaymentStatus,
  type OrderStatus,
} from "@/lib/types";

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending_payment: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  preparing: "bg-indigo-100 text-indigo-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-xv-gray-200 text-xv-gray-700",
  cancelled: "bg-red-100 text-red-800",
};

export function OrderStatusBadge({
  status,
  paymentStatus,
}: {
  status: OrderStatus;
  paymentStatus?: OrderPaymentStatus;
}) {
  return (
    <span className="inline-flex flex-col gap-1">
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap ${STATUS_COLORS[status]}`}
      >
        {ORDER_STATUS_LABELS[status]}
      </span>
      {paymentStatus === "rejected" ? (
        <span className="text-[10px] font-bold text-red-600">pagamento recusado</span>
      ) : null}
      {paymentStatus === "refunded" ? (
        <span className="text-[10px] font-bold text-xv-gray-500">estornado</span>
      ) : null}
    </span>
  );
}
