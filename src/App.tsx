import { BirthdayProvider } from './context/birthday/BirthdayContext';
import { PaginationProvider } from './context/pagination/PaginationContext';
import Header from './shared/components/Header/Header';
import BirthdayList from './features/birthdays/BirthdayList';
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
