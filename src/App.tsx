import { BirthdayProvider } from './features/birthdays/context/BirthdayContext';
import { PaginationProvider } from './features/pagination/context/PaginationContext';
import Header from './shared/components/Header/Header';
import BirthdayList from './features/birthdays/components/BirthdayList';
import './App.css';

function App() {
  return (
    <BirthdayProvider>
      <PaginationProvider>
        <div className="App">
          <Header />
          <BirthdayList />
        </div>
      </PaginationProvider>
    </BirthdayProvider>
  );
}

export default App;
