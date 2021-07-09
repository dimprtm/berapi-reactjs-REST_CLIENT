import React, { useReducer, createContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MenuComp from './component/MenuComp';
import LoginComp from './component/LoginComp';
import HomeComp from './component/HomeComp';
import RegisterComp from './component/RegisterComp';
import Publik from './component/Publik';
import ListNews from './component/Admin/ListNews';
import InsertNews from './component/Admin/InsertNews';
import UpdateNews from './component/Admin/UpdateNews';

//Context
export const AuthContext = createContext()

//Inisiasi state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpires: 0,
  role: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", JSON.stringify(action.payload.token))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        tokenExpires: action.payload.expires,
        role: action.payload.role
      }
    case "LOGOUT":
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }

    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider value={{
          state,
          dispatch
        }}>
          <MenuComp />
          <Route exact path="/" component={Publik} />
          <Route exact path="/login" component={LoginComp} />
          <Route exact path="/dashboard" component={HomeComp} />
          <Route exact path="/register" component={RegisterComp} />
          <Route exact path="/admin" component={ListNews} />
          {/* <Route exact path="/news" component={ListNews} /> */}
          <Route exact path="/news/insert" component={InsertNews} />
          <Route exact path="/news/update" component={UpdateNews} />
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
