import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Navbar from "./Navbar";


class Home extends Component {


    render(){
        return(
            <div>
                <Navbar/>
                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                        <div className=" container">
                            <br/><br/>

                                <h1 className=" header center blue-text ">Professor</h1>
                                <div className="row center">
                                    {/*<img className="row center bordered" src="logo-professor.png" alt=""/>*/}
                                    <h5 className="header col s12 light dark-text">A practical web-app for administering teaching-related tasks</h5>
                                </div>
                                <div className="row center">
                                    <Link to="/register" id="download-button"
                                       className="btn-large waves-effect waves-red red-background lighten-1">Get Started</Link>
                                </div>
                                <br/><br/>

                        </div>
                    </div>
                    <div className="parallax "><img className="home-image" src="nathan-dumlao-572047-unsplash.jpg" alt="Unsplashed background img 1"/></div>
                </div>


                <div className="container">
                    <div className="section">

                        {/*<!--   Icon Section   -->*/}
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                                    <h5 className="center">Speeds up development</h5>

                                    <p className="light">We did most of the heavy lifting for you to provide a default
                                        stylings that incorporate our custom components. Additionally, we refined
                                        animations and transitions to provide a smoother experience for developers.</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                                    <h5 className="center">User Experience Focused</h5>

                                    <p className="light">By utilizing elements and principles of Material Design, we
                                        were able to create a framework that incorporates components and animations that
                                        provide more feedback to users. Additionally, a single underlying responsive
                                        system across all platforms allow for a more unified user experience.</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                                    <h5 className="center">Easy to work with</h5>

                                    <p className="light">We have provided detailed documentation as well as specific
                                        code examples to help new users get started. We are also always open to feedback
                                        and can answer any questions a user may have about Materialize.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="parallax-container valign-wrapper">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <div className="row center">
                                <h5 className="header col s12 light"></h5>
                            </div>
                        </div>
                    </div>
                    <div className="parallax"><img className="home-image" src="rawpixel-660721-unsplash.jpg" alt="Unsplashed background img 2"/></div>
                </div>

                <div className="container">
                    <div className="section">

                        <div className="row">
                            <div className="col s12 center">
                                <h3><i className="mdi-content-send brown-text"></i></h3>
                                <h4>Contact Us</h4>
                                <p className="left-align light">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non
                                    consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo,
                                    ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium
                                    eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis
                                    nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed
                                    ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat.
                                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                                    Curae;</p>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="parallax-container valign-wrapper">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <div className="row center">
                                <h5 className="header col s12 white-text center-align" >"Awesome!" <br/> -John Stuart Mill</h5>
                            </div>
                        </div>
                    </div>
                    <div className="parallax"><img className="home-image" src="tra-nguyen-459276-unsplash.jpg" alt="Unsplashed background img 3"/></div>
                </div>

                <footer className="page-footer teal">
                    <div className="container">
                        <div className="row">
                            <div className="col l6 s12">
                                <h5 className="white-text">Company Bio</h5>
                                <p className="grey-text text-lighten-4">We are a team of college students working on
                                    this project like it's our full time job. Any amount would help support and continue
                                    development on this project and is greatly appreciated.</p>


                            </div>
                            <div className="col l3 s12">
                                <h5 className="white-text">Settings</h5>
                                <ul>
                                    <li><a className="white-text" href="#!">Link 1</a></li>
                                    <li><a className="white-text" href="#!">Link 2</a></li>
                                    <li><a className="white-text" href="#!">Link 3</a></li>
                                    <li><a className="white-text" href="#!">Link 4</a></li>
                                </ul>
                            </div>
                            <div className="col l3 s12">
                                <h5 className="white-text">Connect</h5>
                                <ul>
                                    <li><a className="white-text" href="#!">Link 1</a></li>
                                    <li><a className="white-text" href="#!">Link 2</a></li>
                                    <li><a className="white-text" href="#!">Link 3</a></li>
                                    <li><a className="white-text" href="#!">Link 4</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="container">
                            Made by <a className="brown-text text-lighten-3"
                                       href="http://materializecss.com">Materialize</a>
                        </div>
                    </div>
                </footer>
            </div>

                )
    }
}

export default Home;