import React, { Component } from "react";

import "./App.css";
import EventDetail from "./components/event-detail";
import Modal from "./components/modal";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      textSearch: "",
      categories: [],
      categorySelect: "",
      result: [],
      viewModal: false,
      eventSelect: {name:"",description:""}
    };

    this.handlerChange = this.handlerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCategorySelect = this.handleChangeCategorySelect.bind(this);
    this.handleResultSearch = this.handleResultSearch.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {

    this.handlerFetchFunction();
    this.handlerFetchCategories();
  }

  handlerFetchFunction() {
    const TOKENOAUTH = 'ZBZO5XI2AEPNABAIHIMP';
    const url = `https://www.eventbriteapi.com/v3/events/search/?q=${
      this.state.textSearch}&token=${TOKENOAUTH}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(
        function (resultado) {
          this.setState({
            data: resultado.events
          });
        }.bind(this)
      )
      .catch(error => {
        console.log("error", error);
      });
  }

  handlerFetchCategories() {
    const TOKENOAUTH = 'ZBZO5XI2AEPNABAIHIMP';
    const url = `https://www.eventbriteapi.com/v3/categories/?token=${TOKENOAUTH} `;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(
        function (resultado) {
          this.setState({
            categories: resultado.categories
          });
        }.bind(this)
      )
      .catch(error => {
        console.log("error", error);
      });
  }

  handlerChange(event) {

    const { value } = event.target;
    this.setState(
      {
        textSearch: value
      },
      () => this.handlerFetchFunction()
    );
  }

  handleChangeCategorySelect(event) {
    const { value } = event.target;
    this.setState(
      {
        categorySelect: value
      }
    );
  }

  handleResultSearch() {

    const data1 = this.state.data;
    const category = this.state.categorySelect;
    let dataResult = [];

    if (data1 && category) {
      data1.forEach(element => {
        if (element.category_id === category) {
          dataResult.push(element)
        }

      });
      this.setState(
        {
          result: dataResult
        }
      );
    }
    if (data1 && !category) {
      this.setState(
        {
          result: data1
        }
      );
    }


  }

  handleOpenModal(dataSelect) {

    this.setState(
      {
        viewModal: true,
        eventSelect: dataSelect
      }
    );
  }

  handleCloseModal() {

    this.setState(
      {
        viewModal: false
      }
    );
  }


  handleSubmit(event) {
    event.preventDefault();
    this.handleResultSearch()
  }

  // https://www.eventbriteapi.com/v3/events/search/?location.address=lima&token=ZBZO5XI2AEPNABAIHIMP  Por ubicacion
  // https://www.eventbriteapi.com/v3/categories/?token=ZBZO5XI2AEPNABAIHIMP Api categorias
  // https://www.eventbriteapi.com/v3/events/search/?q=bitcoins&token=ZBZO5XI2AEPNABAIHIMP  por palabra

  render() {
    const { categories } = this.state;
    const result = this.state.result;

    return (
      <div className="App">
        <nav className="navbar navbar-light mb-3" style={{ backgroundColor: "#E93353" }}>
          <p className="navbar-brand text-white" > Events  </p>
        </nav>
        <div className="d-flex justify-content-center">
          <p>Busca tu evento por nombre o categoría</p>
        </div>
        <div className="container mb-3">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <input
                  name="textSearch"
                  value={this.state.textSearch}
                  onChange={this.handlerChange}
                  type="text"
                  className="form-control"
                  placeholder="Ingresa un evento"
                />
              </div>
              <div className="col">
                <select onChange={this.handleChangeCategorySelect} className="form-control">
                  <option value="">Selecciona una categoría</option>
                  {categories.map(category => (
                    <option value={category.id} key={category.id}>
                      {category.name}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <button className="btn  btn-color btn-block" type="submit">Buscar</button>
              </div>
            </div>

          </form>
        </div>

        <section>

          {result.length > 0 ?

            <div className="grid container">
              {result.map(events => (
                <EventDetail key={events.id}
                  events={events}
                  handleOpenModal={this.handleOpenModal}
                  handleCloseModal={this.handleCloseModal}
                  viewModal={this.state.viewModal} ></EventDetail>
              ))}
            </div>

            : <div className="d-flex justify-content-center" ><p>No se encontraron resultados</p></div>}

        </section>
        
          <Modal viewModal={this.state.viewModal} handleCloseModal={this.handleCloseModal}
            info={this.state.eventSelect}
          ></Modal> 
        

      </div>
    );
  }
}

export default App;
