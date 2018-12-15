import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Home/Profile";
import CourseForm from "./components/Professor/CourseForm";
import Catalog from "./components/Student/Catalog";

const Router = ({state}) => (
    <Switch>
        <Route  exact path='/' component={Home} />
        <Route exact path='/login' component={Login}/>
        <Route  exact path='/register' component={Register}/>
        <Route  exact path='/profile' component={Profile} />
        <Route  exact path='/new-course' component={CourseForm} />
        <Route  exact path='/catalog' component={Catalog} />}/>
    </Switch>
);

export default Router;