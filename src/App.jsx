import { useEffect } from 'react'
import { fetchDataFromApi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration , getGenres } from './store/homeSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import SearchResult from './pages/SearchResult';
import Explore from './pages/Explore';
import PageNotFound from './pages/404';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url)

  useEffect(() => {
    fetchApiConfig();
    genresCall(); 
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res)

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};
  return (
    <BrowserRouter>
    <HeaderComponent/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/:mediaType/:id" element={<Details/>} />
      <Route path="/search/:query" element={<SearchResult/>} />
      <Route path="/explore/:mediaType" element={<Explore/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    <FooterComponent/>
    </BrowserRouter>
  )
}

export default App
