import Header from './components/Header/Header';
import BirthdayList from './features/birthdays/BirthdayList';
import { BirthdayProvider } from './features/birthdays/context/BirthdayContext';
import './App.css';

function App() {
  return (
    <BirthdayProvider>
      <div className="App">
        <Header />
        <BirthdayList />
      </div>
    </BirthdayProvider>
  );
}

export default App;
