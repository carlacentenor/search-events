import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      textSearch: "",
      categories: [],
      categorySelect: "",
      result :[]
    };

     this.handlerChange = this.handlerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCategorySelect = this.handleChangeCategorySelect.bind(this);
    this.handleResultSearch = this.handleResultSearch.bind(this);
  }

  componentDidMount() {
    this.handlerFetchFunction();
    this.handlerFetchCategories();
  }

  handlerFetchFunction() {
    const url = `https://www.eventbriteapi.com/v3/events/search/?q=${
      this.state.textSearch}&token=ZBZO5XI2AEPNABAIHIMP`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(
        function(resultado) {
    
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
    const url = `https://www.eventbriteapi.com/v3/categories/?token=ZBZO5XI2AEPNABAIHIMP `;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(
        function(resultado) {
        
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

  handleChangeCategorySelect(event){
    const { value } = event.target;
    this.setState(
      {
        categorySelect: value
      }
      
    );
   
  }

  handleResultSearch(){
 
    const data1 = this.state.data;
    const category = this.state.categorySelect;
    let dataResult = []; 
    data1.forEach(element => {
      if(element.category_id == category){
        dataResult.push(element)
      }
      
    });
    this.setState(
      {
        result: dataResult
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
 console.log(result)
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            name="textSearch"
            value={this.state.textSearch}
            onChange={this.handlerChange}
            type="text"
          />
          <select onChange={this.handleChangeCategorySelect}>
            {categories.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}{" "}
              </option>
            ))}
          </select>
          <button className="btn btn-success" type="submit">Buscar</button>
        </form>
        <section>
        
     {result.length >0 ? 

        
<div className="grid">
{result.map(events => (
  
  <div className="card " key={events.id}>
  <img src={events.logo? events.logo.original.url : 'logo.svg'  } className="card-img-top"/>
  <div className="card-body">
    <h5 className="card-title">{events.name.text}</h5>
    <p className="card-text">{events.summary}</p>
  </div>
  
  
</div>
))}
</div>
         : <p>No se encontraron resultados</p> }   
           
        </section>
      </div>
    );
  }
}

export default App;
