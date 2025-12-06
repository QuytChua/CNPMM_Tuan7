# 📚 Book Cart Project - CNPMM Tuần 7

Ứng dụng web quản lý giỏ hàng sách được phát triển với **React** và **GraphQL**.

## 🏗️ Kiến Trúc Dự Án

- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Apollo GraphQL Server
- **Architecture**: Monorepo với Workspaces
- **State Management**: React Hooks

## 🚀 Chạy Dự Án

### Cài đặt dependencies:

```bash
npm install
```

### Chạy cả frontend và backend:

```bash
npm run dev
```

### Hoặc chạy riêng biệt:

```bash
# Backend (port 4000)
npm run server

# Frontend (port 3000)
npm run demo
```

## 📁 Cấu Trúc Thư Mục

```
book-cart-project/
├── package.json                # Root workspace config
├── apps/
│   ├── demo/                  # React Frontend
│   │   ├── src/
│   │   │   ├── components/    # UI Components (tách riêng)
│   │   │   ├── utils/        # Helper functions
│   │   │   └── App.js        # Main app
│   │   └── package.json
│   └── server/               # GraphQL Backend
│       ├── index.js         # Apollo Server
│       └── package.json
```

## ✨ Tính Năng

- ✅ Hiển thị danh sách sách
- ✅ Thêm/xóa sách khỏi giỏ hàng
- ✅ Cập nhật số lượng sách
- ✅ Chọn sách để thanh toán
- ✅ Giao diện responsive với Tailwind CSS
- ✅ GraphQL API với real-time updates

## 🧩 Components Architecture

Frontend đã được tách thành các component độc lập:

- `BookCard` - Hiển thị thông tin sách
- `BookList` - Container danh sách
- `CartControls` - Controls header
- `ConfirmModal` - Modal xác nhận
- `LoadingScreen` - Loading state
- `ErrorScreen` - Error handling

## 🔧 Technologies

**Frontend:**

- React 18.2.0
- Tailwind CSS
- http-proxy-middleware

**Backend:**

- Apollo Server 3.13.0
- GraphQL 16.8.1
- Lodash 4.17.21
- Nodemon (dev)

## 🎯 GraphQL Schema

```graphql
type Book {
  id: ID!
  title: String!
  price: Int!
  quantity: Int!
}

type Query {
  cart: [Book!]!
}

type Mutation {
  add(title: String!, price: Int!, quantity: Int): Book!
  updateQuantity(id: ID!, quantity: Int!): Book!
  remove(id: ID!): Boolean!
  checkout(ids: [ID!]!): [Book!]!
}
```

## 📝 Ghi Chú

Dự án được phát triển cho môn **Công Nghệ Phần Mềm Mã Nguồn Mở** - Tuần 7.

---

**Author**: CNPMM Team  
**Year**: 2025
