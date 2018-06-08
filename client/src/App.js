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
                }
                }              >
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

class Vacation extends Component {
    constructor() {
        super();
        this.state = {
            vacationData: null
        };
    }
    componentDidMount() {
        const zip = this.props.zip;
        const URL = "//api.openweathermap.org/data/2.5/weather?q=" +
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
        const iconUrl = "//openweathermap.org/img/w/" + weather.icon + ".png";
        return (
            <div id = "passPrompt">
            <h1>
            Введите пароль для проекта
        </h1>
        <input type="password" id = "projPass" />
            <button type="submit" onClick={() => {
            if (document.getElementById("passValMsg")) document.getElementById("passValMsg").remove();
            var entPass = document.getElementById("projPass");
            var data = JSON.stringify({"team": document.getElementsByClassName("active")[0].childNodes[0].innerHTML, "password": entPass.value});
            console.log('Sent to server: ' + data);
            var xhr = new XMLHttpRequest();
            var url = "http://localhost:3001/";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log("Received from server: " + xhr.responseText);
                    if(json.msg == "Success") {
                    render(<Home />, document.getElementById('root'));
                    }
                    else {
                        var div = document.createElement('div');
                        div.className = "alert";
                        div.setAttribute("id", "passValMsg");
                        div.innerHTML = "<strong>" + json.msg + "</strong>";

                        document.body.appendChild(div);
                        document.getElementById("passPrompt").appendChild(div);
                    }
                }
            };
            xhr.send(data);
        }}>Submit</button>

        {/* <p>Current: {vacationData.main.temp}°</p>
        <p>High: {vacationData.main.temp_max}°</p>
        <p>Low: {vacationData.main.temp_min}°</p>
        <p>Wind Speed: {vacationData.wind.speed} mi/hr</p>*/}
    </div>
    );
    }
}

export default App;
