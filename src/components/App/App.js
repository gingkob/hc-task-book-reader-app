import { Route, Switch } from 'react-router-dom';
import { Home, BookDetails, MyReadings,/*  AddBook, */ AddComment } from '../../pages';
import { Header } from '../Header';
import './App.css';

function App() {

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path={['/', '/home']}> {/* could use Redirect from react-router-dom, too */}
          <Home />
        </Route>
        <Route path='/book/:type/:bookId'>
          <BookDetails />
        </Route>
        <Route path='/my-readings'>
          <MyReadings />
        </Route>
        {/* <Route path='/add-book'>
          <AddBook />
        </Route> */}
        <Route path='/add-comment/:bookId'>
          <AddComment />
        </Route>
        <Route >
          {() => (<h2>Page not found!</h2>)}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
