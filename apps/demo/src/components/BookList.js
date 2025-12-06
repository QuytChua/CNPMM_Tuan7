import React from "react";
import BookCard from "./BookCard";

function BookList({
  books,
  selectedBooks,
  onSelect,
  onUpdateQuantity,
  onRemove,
}) {
  return (
    <div className="space-y-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          selected={selectedBooks.includes(book.id)}
          onSelect={onSelect}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default BookList;
