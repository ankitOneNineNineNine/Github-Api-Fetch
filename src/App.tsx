import { Route, Routes } from "react-router-dom";
import Provider from "./infrastructure/Provider/Provider";
import { DetailsPage } from "./pages/Details/details.page";
import { SearchPage } from "./pages/Search/search.page";

/**
 *
 * App Component
 * @export App
 * @return JSX.Element
 */
export default function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </Provider>
  );
}
