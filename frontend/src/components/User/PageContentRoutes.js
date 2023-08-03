import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProfileView from './UserProfileView'
import MyThreadListing from './MyThreadListing'
import FavoriteThread from './FavoriteThread'

function PageContentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserProfileView />}></Route>
      <Route path="/listing" element={<MyThreadListing />}></Route>
      <Route path="/favorite" element={<FavoriteThread />}></Route>
    </Routes>
  );
}
export default PageContentRoutes;