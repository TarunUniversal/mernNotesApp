import React, { useState } from "react";
import Header from "./components/header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import LandingPage from "./components/pages/LandingPage";
import MyNotes from "./components/pages/MyNotes";
import CreateNote from "./components/pages/CreateNote";
import Authentic from "./components/pages/Authentic";
import EditNote from "./components/pages/EditNote";
import NotFound from "./components/pages/NotFound";
import Profile from "./components/pages/Profile";
import ProfileUpdate from "./components/pages/ProfileUpdate";
import ForgotPass from "./components/pages/ForgotPass";
import ResetPass from "./components/pages/ResetPass";
import Activate from "./components/pages/Activate";


function App() {
  const [search, setSearch] = useState("");

  return (
    <>
    <BrowserRouter>
      <Header setSearch={setSearch} />
        <main>
          <Route path="/" component={LandingPage} exact />
          <Route path="/mynotes" component={() => <MyNotes search={search}/>} />
          <Route path="/createnote" component={CreateNote} />
          <Route path="/note/:id" component={EditNote} />
          <Route path="/authenticate/:id" component={Authentic} />
          <Route path="/activate/:id" component={Activate} />
          <Route path="/forgot-password" component={ForgotPass} />
          <Route path="/resetPassword/:id" component={ResetPass} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/profile" component={Profile} />
          <Route path="/profileupdate" component={ProfileUpdate} />

        </main>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
