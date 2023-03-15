import { Landing, ErrorPage, ProtectedRoute } from "./pages";
import { Register } from "./features/authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CreateProduct,
  ShowProducts,
  UpdateProduct,
  UserProfile,
} from "./features/dashboard";
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
          <Route path="create-products" element={<CreateProduct />} />
          <Route path="update-products" element={<UpdateProduct />} />
          <Route path="user-profile" element={<UserProfile />} />
          {/* <Route path="show-files" element={<ShowFiles/>} /> */}
          {/* <Route path="add-file" element={<AddFiles/>} /> */}
          {/* <Route path="compare-products" element={<CompareProducts/>} /> */}
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
