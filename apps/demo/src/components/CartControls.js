import React from "react";

function CartControls({
  books,
  selectedBooks,
  totalAmount,
  onSelectAll,
  onCheckout,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onSelectAll}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedBooks.length === books.length}
              onChange={() => {}}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span>Chọn tất cả ({books.length} sản phẩm)</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Đã chọn: {selectedBooks.length} sản phẩm
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {totalAmount.toLocaleString()}đ
            </div>
          </div>
          <button
            onClick={onCheckout}
            disabled={selectedBooks.length === 0}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Thanh toán ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartControls;
