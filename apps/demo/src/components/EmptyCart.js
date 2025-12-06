import React from "react";

function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">
        Giỏ hàng trống
      </h2>
      <p className="text-gray-500">
        Hãy thêm một số cuốn sách vào giỏ hàng của bạn
      </p>
    </div>
  );
}

export default EmptyCart;
