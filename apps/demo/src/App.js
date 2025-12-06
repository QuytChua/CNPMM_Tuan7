import React, { useState, useEffect } from "react";
import { graphqlRequest } from "./utils/graphql";
import {
  BookList,
  CartControls,
  ConfirmModal,
  EmptyCart,
  ErrorScreen,
  Header,
  LoadingScreen
} from "./components";

// Component chính
function ModernCart() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, book: null });

  // Load data
  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await graphqlRequest(`
        query {
          cart {
            id
            title
            price
            quantity
          }
        }
      `);

      if (data && data.cart) {
        console.log("Loaded books:", data.cart);
        setBooks(data.cart);
        setError(null);
      } else {
        setError("Không thể tải dữ liệu");
      }
    } catch (error) {
      console.error("Error loading books:", error);
      setError("Lỗi tải dữ liệu: " + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSelectBook = (id) => {
    setSelectedBooks((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedBooks(
      selectedBooks.length === books.length ? [] : books.map((book) => book.id)
    );
  };

  const handleUpdateQuantity = async (id, quantity) => {
    await graphqlRequest(
      `
      mutation ($id: ID!, $quantity: Int!) {
        updateQuantity(id: $id, quantity: $quantity) {
          id
          quantity
        }
      }
    `,
      { id, quantity }
    );

    loadBooks();
  };

  const handleRemove = (book) => {
    setDeleteModal({ isOpen: true, book });
  };

  const confirmRemove = async () => {
    if (deleteModal.book) {
      try {
        console.log("Removing book with ID:", deleteModal.book.id);

        const result = await graphqlRequest(
          `
          mutation ($id: ID!) {
            remove(id: $id)
          }
        `,
          { id: deleteModal.book.id }
        );

        console.log("Remove result:", result);

        if (result && result.remove) {
          setSelectedBooks((prev) =>
            prev.filter((id) => id !== deleteModal.book.id)
          );
          setDeleteModal({ isOpen: false, book: null });
          loadBooks();
          console.log("Book removed successfully");
        } else {
          console.error("Failed to remove book");
          alert("Không thể xóa sách. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Error removing book:", error);
        alert("Lỗi khi xóa sách: " + error.message);
      }
    }
  };

  const handleCheckout = async () => {
    if (selectedBooks.length > 0) {
      await graphqlRequest(
        `
        mutation ($ids: [ID!]!) {
          checkout(ids: $ids) {
            id
            title
          }
        }
      `,
        { ids: selectedBooks }
      );

      alert(`Đã thanh toán thành công ${selectedBooks.length} sản phẩm!`);
      setSelectedBooks([]);
      loadBooks();
    }
  };

  const totalAmount = books
    .filter((book) => selectedBooks.includes(book.id))
    .reduce((total, book) => total + book.price * book.quantity, 0);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Header />

        {books.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <CartControls 
              books={books}
              selectedBooks={selectedBooks}
              totalAmount={totalAmount}
              onSelectAll={handleSelectAll}
              onCheckout={handleCheckout}
            />

            <BookList 
              books={books}
              selectedBooks={selectedBooks}
              onSelect={handleSelectBook}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          </>
        )}

        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, book: null })}
          onConfirm={confirmRemove}
          title={deleteModal.book?.title}
        />
      </div>
    </div>
  );
}

export default function App() {
  return <ModernCart />;
}