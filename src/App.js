import './App.css';
import Category from "./components/category";
import MovieList from './components/movie-list';
import { useCreateStore, StoreContext } from './store/globalStore';

function App() {
  const createStore = useCreateStore([]);//create zustand store

  return (
    <>
      <StoreContext.Provider value={createStore}>
        <Category />
        <MovieList />
      </StoreContext.Provider>
    </>
  );
}

export default App;
