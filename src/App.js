import './App.css';
import ErrorBoundary from './components/Errorboundary/ErrorBoundary';
import Header from './components/Header/Header';
import Messages from './pages/Messages/Message';

function App() {
  const pageTitle = 'Messages';

  return (
    <div className="App">
      <ErrorBoundary>
        <Header title={pageTitle} />
        <Messages />
      </ErrorBoundary>
    </div>
  );
}

export default App;
