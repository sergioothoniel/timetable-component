import './App.css';
import Timetable from './components/timetable';
import { standardTimes } from './components/utils';

function App() {
  return (
    <div className="App">
      <Timetable schedulesDefeault={standardTimes} year={2022}/>
    </div>
  );
}

export default App;
