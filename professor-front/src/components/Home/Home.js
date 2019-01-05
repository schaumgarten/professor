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
                                    <h2 className="center brown-text"><i className="material-icons">beach_access</i></h2>
                                    <h5 className="center">Morbi congue eu</h5>

                                    <p className="light">

                                        In scelerisque metus dolor. Phasellus blandit eros at enim placerat, ut
                                        consectetur diam sollicitudin. Vestibulum a odio consequat, cursus massa eget,
                                        condimentum orci. Phasellus lectus elit, feugiat sit amet egestas at, faucibus
                                        at nulla. Nulla facilisi.  </p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">bubble_chart</i></h2>
                                    <h5 className="center">Nam lacinia congue</h5>

                                    <p className="light">

                                        Maecenas ultrices consequat lorem vel ultricies. Integer ut dolor blandit,
                                        ullamcorper elit id, eleifend risus. Curabitur pharetra lobortis vulputate.
                                        In leo arcu, porta congue justo quis, efficitur elementum erat. Phasellus nec
                                        tortor diam. </p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">cake</i></h2>
                                    <h5 className="center">Integer semper dolor</h5>

                                    <p className="light">

                                        Mauris id velit non lectus faucibus commodo eu at erat. In lacinia, est quis dignissim
                                        aliquam, mi metus accumsan quam, pretium posuere risus ante quis est. Vestibulum sed
                                        facilisis leo, at posuere est. Nunc porta neque ligula, et iaculis augue rutrum efficitur.
                                        Integer porttitor tortor id lacus venenatis porttitor.  </p>
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

                <footer className="page-footer blue-background">
                    <div className="footer-copyright">
                        <div className="container">
                            Made by <a className="brown-text text-lighten-3"
                                       href="http://github.com/schaumgarten">Oscar Zoletto</a>
                        </div>
                    </div>
                </footer>
            </div>

                )
    }
}

export default Home;