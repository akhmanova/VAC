import React, { Component } from "react";
import "bootswatch/journal/bootstrap.css";
// import "bootstrap/dist/css/bootstrap.css";
import { render } from 'react-dom'
import Home from './js/components/Home'
import "./App.css";

import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Backend Developers", zip: "94303" },
  { name: "Frontend Developers", zip: "94088" },
  { name: "QA & automation", zip: "95062" },
  { name: "UI/UX", zip: "96803" }
];

class Vacation extends Component {
  constructor() {
    super();
    this.state = {
      vacationData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ vacationData: json });
    });
  }
  render() {
    const vacationData = this.state.vacationData;
    if (!vacationData) return <div>Loading</div>;
    const weather = vacationData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div id = "passPrompt">
        <h1>
          Введите пароль для проекта
        </h1>
        <input type="password" id = "projPass" />
        <button type="submit" onClick={() => {
            if (document.getElementById("passValMsg")) document.getElementById("passValMsg").remove();
            var entPass = document.getElementById("projPass");
            console.log('Entered '+ entPass.value);
            var validRes = document.createElement('div');
            validRes.setAttribute("id", "passValMsg");
             if (entPass.value == this.props.zip) {
                 render(<Home />, document.getElementById('root'));
                 // validRes.className = "result-success";
                 // validRes.innerHTML = "<strong>Да!</strong>";
                 // document.getElementById("passPrompt").appendChild(validRes);
                 document.getElementById("passPrompt").remove();
             }
             else {
                 validRes.className = "result-fail";
                 validRes.innerHTML = "<strong>Неверный пароль</strong>";
                 document.getElementById("passPrompt").appendChild(validRes);
             }
            }}>Submit</button>

       {/* <p>Current: {vacationData.main.temp}°</p>
        <p>High: {vacationData.main.temp_max}°</p>
        <p>Low: {vacationData.main.temp_min}°</p>
        <p>Wind Speed: {vacationData.wind.speed} mi/hr</p>*/}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              VAC - Vacation Plan
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Выберите команду</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <Vacation key={activePlace} zip={PLACES[activePlace].zip} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
