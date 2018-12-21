import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Home/Profile";
import CourseForm from "./components/Professor/CourseForm";
import Catalog from "./components/Student/Catalog";
import CourseView from "./components/Professor/CourseView"

const Router = ({state,change}) => {
        return(
    <Switch>
        <Route  exact path='/' component={Home} />
        <Route exact path='/login' component={Login}/>
        <Route  exact path='/register' component={Register}/>
        <Route  exact path='/profile' render={(props) => <Profile {...props} change={change}/>} />
        <Route  exact path='/new-course' component={CourseForm} />
        <Route  exact path='/catalog' component={Catalog} />}/>
        <Route  exact path='/course-view' render={(props) => <CourseView state={state} {...props}/>} />
    </Switch>
)};

export default Router;