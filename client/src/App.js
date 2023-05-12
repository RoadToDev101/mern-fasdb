import { Landing, VerifyEmail, ErrorPage, ProtectedRoute } from "./pages";
import { Register } from "./features/authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProfile } from "./features/other";
import {
  CreateProduct,
  ShowProducts,
  UpdateProduct,
  ProductDetails,
} from "./features/crud-product";
import SharedLayout from "./layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ShowProducts />} />
          <Route path="product-details" element={<ProductDetails />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="update-product" element={<UpdateProduct />} />
          <Route path="user-profile" element={<UserProfile />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="landing" element={<Landing />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
