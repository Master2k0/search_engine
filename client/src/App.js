import "./App.css";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./Page/Home/Home";
import Search from "./Page/Search/Search";
import NotFound from "./Page/NotFound/NotFound";
import {useState} from 'react';

function App() {
    const [option,setOption] = useState(false);
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home option={option} setOption={setOption} />
                    </Route>
                    <Route  path="/home">
                        <Home option={option} setOption={setOption}/>
                    </Route>
                    <Route  path="/search">
                        <Search option={option} setOption={setOption}/>
                    </Route>
                    <Route>
                      <NotFound/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
