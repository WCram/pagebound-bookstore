import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CatalogPage from './pages/CatalogPage'
import BookDetailPage from './pages/BookDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import BorrowBagPage from './pages/BorrowBagPage'
import BorrowCheckoutPage from './pages/BorrowCheckoutPage'
import LoanConfirmationPage from './pages/LoanConfirmationPage'
import Library3DPage from './pages/Library3DPage'
import AdminBooksPage from './pages/admin/AdminBooksPage'
import AdminBookFormPage from './pages/admin/AdminBookFormPage'
import AdminLoansPage from './pages/admin/AdminLoansPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:id" element={<OrderConfirmationPage />} />
        <Route path="/borrow-bag" element={<BorrowBagPage />} />
        <Route path="/borrow-checkout" element={<BorrowCheckoutPage />} />
        <Route path="/loans/confirmation" element={<LoanConfirmationPage />} />
        <Route path="/library-3d" element={<Library3DPage />} />
        <Route path="/admin" element={<AdminBooksPage />} />
        <Route path="/admin/new" element={<AdminBookFormPage />} />
        <Route path="/admin/:id/edit" element={<AdminBookFormPage />} />
        <Route path="/admin/loans" element={<AdminLoansPage />} />
      </Route>
    </Routes>
  )
}
