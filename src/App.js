import './App.css';
import Header from './Header';
import Home from './Home'

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" component={Home} />
        {/* Other routes */}
      </div>
    </Router>
  );
}

export default App;
