import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Landing, VerifyEmail, ErrorPage, ProtectedRoute } from "./pages";
import { Register } from "./features/authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProfile, GuidePage } from "./features/other";
import {
  CreateProduct,
  ShowProducts,
  UpdateProduct,
  ProductDetails,
} from "./features/crud-product";
import { ToolsPage, CompareScrews } from "./features/tools";
import { ShowFiles, UploadFile, UploadDrawing } from "./features/crud-files";
import SharedLayout from "./layouts";
import AdminDashboard from "./features/other/components/adminDashboard";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
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
            <Route path="tools" element={<ToolsPage />} />
            <Route path="show-files" element={<ShowFiles />} />
            <Route path="compare-screws" element={<CompareScrews />} />
            <Route path="upload-file" element={<UploadFile />} />
            <Route path="upload-drawing" element={<UploadDrawing />} />
            <Route path="guide" element={<GuidePage />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="admin-dashboard" element={<AdminDashboard />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="verify-email/:emailToken" element={<VerifyEmail />} />
          <Route path="landing" element={<Landing />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
