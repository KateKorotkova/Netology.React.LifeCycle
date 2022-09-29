import './App.css';
import {Clocks} from "./Clocks/clocks"
import {NotesList} from "./crud/notesList"


function App() {
  let isFirstTask = false;
  return (<> { isFirstTask ? <Clocks/> : <NotesList/> } </>);
}


export default App;
