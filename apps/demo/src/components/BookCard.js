import React from "react";

function BookCard({ book, selected, onSelect, onUpdateQuantity, onRemove }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border-2 ${
        selected ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent"
      }`}
    >
      <div className="flex items-start space-x-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(book.id)}
          className="mt-2 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                📖 {book.title}
              </h3>
              <div className="text-xl font-bold text-blue-600 mb-3">
                {(book.price * book.quantity).toLocaleString()}đ
              </div>
            </div>

            <button
              onClick={() => onRemove(book)}
              className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
              title="Xóa khỏi giỏ hàng"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Số lượng:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    onUpdateQuantity(book.id, Math.max(1, book.quantity - 1))
                  }
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                  disabled={book.quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={book.quantity}
                  onChange={(e) =>
                    onUpdateQuantity(
                      book.id,
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-16 text-center py-1 border-0 focus:ring-0"
                  min="1"
                />
                <button
                  onClick={() => onUpdateQuantity(book.id, book.quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            {book.price.toLocaleString()}đ × {book.quantity}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
