
import React, { Component } from 'react';
import './index.css';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import ShopifyBag from './assets/img/shopify-bag.png';
import TestMovie from './assets/img/test_movie.jpg';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


{/* <Typography align='center' style={{ fontFamily: 'TwReg', paddingLeft: 8, paddingRight: 8, fontSize: 16, color: 'white', lineHeight: 1.25 }}>The Lord of the Rings: The Return of the King</Typography> */}

const movies = {
  "Title":"Guardians of the Galaxy Vol. 2",
  "Year":"2017",
  "Rated":"PG-13",
  "Released":"05 May 2017",
  "Runtime":"136 min",
  "Genre":"Action, Adventure, Comedy, Sci-Fi",
  "Director":"James Gunn",
  "Writer":"James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Jim Starlin (Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Steve Gerber (Howard the Duck created by), Val Mayerik (Howard the Duck created by)",
  "Actors":"Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel",
  "Plot":"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
  "Language":"English",
  "Country":"USA",
  "Awards":"Nominated for 1 Oscar. Another 15 wins & 57 nominations.",
  "Poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
  "Ratings":[
    {
      "Source":"Internet Movie Database",
      "Value":"7.6/10"
    },
    {
      "Source":"Rotten Tomatoes",
      "Value":"85%"
    },
    {
      "Source":"Metacritic",
      "Value":"67/100"
    }
  ],
  "Metascore":"67",
  "imdbRating":"7.6",
  "imdbVotes":"583,183",
  "imdbID":"tt3896198",
  "Type":"movie",
  "DVD":"10 Jul 2017",
  "BoxOffice":"$389,813,101",
  "Production":"Marvel Studios, Walt Disney Pictures",
  "Website":"N/A",
  "Response":"True"
}

const customStyles = {
  content : {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
    height: '100%',
    width: '100%'
  }
};

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      searchQuery: '',
      searchBoxes: [],
      nominees: [null, null, null, null, null],
      nomineeBoxes: [],
      currMovie: '',
      currMovieYear: '',
      currMoviePoster: '',
      display: 'none',
      currNom: 0,
      type: 'search',
      searchInput: ''
    }
  }

  renderResult(){
    console.log(this.state.searchResults, 'DN');
    var searchBoxes = []
    // console.log(res, '!!!!!!!!!!!!!!!!!!!!')
    if(this.state.searchResults.length > 0){
    var res = this.state.searchResults;
    for(let i = 0; i < res.length; i ++){
      console.log(res[i].Title, '@@@@@@@@@@@@@@@@@@@@@@@')
      if(!this.state.nominees.includes(this.state.searchResults[i])){
        searchBoxes.push(
          <div style={{ marginRight: 8, marginLeft: 16, marginRight: 16, marginBottom: 16, marginTop: 16 }}>
            <div onClick={() => this.overlayOn(res[i].Title, res[i].Year, res[i].Poster, 'search')} style={{ cursor: 'pointer', backgroundColor: '#3e3e3e', height: 160, width: 160, borderRadius: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
              <Typography align='center' style={{ fontFamily: 'TwReg', paddingLeft: 8, paddingRight: 8, fontSize: 16, color: 'white', lineHeight: 1.25 }}>{res[i].Title}</Typography>
              <Typography style={{ fontSize: 12, color: 'white' }}>({res[i].Year})</Typography>
            </div>
          </div>
        )
      }
    }
    };
    this.setState({ searchBoxes: searchBoxes })
  }

  renderNominees(nomineeNum){
    var nomineeBox;

    if(this.state.nominees[nomineeNum] == null){
      nomineeBox =
        <div style={{ display: 'flex', maxHeight: '75%', flex: 1, justifyContent: 'center', }}>
          <div style={{ borderWidth: 4, borderStyle: 'dashed', borderColor: '#3e3e3e', height: 160, width: 160, borderRadius: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Typography align='center' style={{ fontFamily: 'TwReg', paddingLeft: 16, paddingRight: 16, fontSize: 64, color: 'white', lineHeight: 1.25 }}>{nomineeNum + 1}</Typography>
          </div>
        </div>;

    }
    else{
      nomineeBox =
        <div style={{ display: 'flex', maxHeight: '75%', flex: 1, justifyContent: 'center' }}>
          <div onClick={() => this.overlayOn(this.state.nominees[nomineeNum][0], this.state.nominees[nomineeNum][1], this.state.nominees[nomineeNum][2], 'nom')} style={{ cursor: 'pointer', backgroundColor: '#3e3e3e', height: 160, width: 160, borderRadius: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Typography align='center' style={{ fontFamily: 'TwReg', paddingLeft: 8, paddingRight: 8, fontSize: 16, color: 'white', lineHeight: 1.25 }}>{this.state.nominees[nomineeNum][0]}</Typography>
            <Typography style={{ fontSize: 12, color: 'white' }}>({this.state.nominees[nomineeNum][1]})</Typography>
          </div>
        </div>

    }
    return nomineeBox;
  }

  overlayOn(name, year, poster, type){
    this.setState({ currMovie: name, currMovieYear: year, currMoviePoster: poster, type: type, display: 'block', })
  }

  overlayOff(){
    this.setState({ currMovie: '', display: 'none', type: 'search' }, () => console.log(this.state.nominees, 'OOOOOOOOOOOOOOOO'))
  }

  setNominee(name, year, poster) {
    // if(this.state.nominees[4] === null){
    var newNomniees = [...this.state.nominees];
    newNomniees[this.state.currNom] = [name, year, poster];
    this.setState({ nominees: newNomniees, currNom: this.state.currNom += 1 }, () => this.overlayOff())
    // }
    // else{
    //   console.log('FULL')
    // }

  }

  delNominee(movie) {
    console.log(movie)
    var newNoms = [];
    for(var i=0; i < this.state.nominees.length; i++){
      console.log(this.state.nominees[i], 'AHSDKAJSHDKAJSHDK')
      if(this.state.nominees[i] !== null){
        console.log('12938012938102938120398123098120931823908')
        if(this.state.nominees[i][0] != movie[0])
        {newNoms.push(this.state.nominees[i]);}
      }
    }
    newNoms.push(null);
    this.setState({ nominees: newNoms, currNom: this.state.currNom - 1 }, () => this.overlayOff());
    console.log(this.state.nominees, 'PPPPPPPPPPPPPPPPPP')
  }

  search(){
    this.setState({ searchQuery: this.state.searchInput }, () => console.log(this.state.searchQuery), () => {
        const api = `https://www.omdbapi.com/?apikey=7a43d71f&s=${this.state.searchQuery}&type=movie`;
        fetch(api)
        .then(res => res.json())
        .then(json => {
            this.setState({ searchResults : (json['Search'])}, () => console.log(this.state.searchResults))
        })
    })
  }

  handleChange(e){
    this.setState({ searchInput: e.target.value })
  }

  async doSearch(){
    this.setState({ searchQuery: this.state.searchInput }, () =>
    fetch(`https://www.omdbapi.com/?apikey=7a43d71f&s=${this.state.searchQuery}&type=movie`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ searchResults: data["Search"] }, () => this.renderResult())
    })
    .catch(console.log)
    )
  }

  render() {
    const Input = () => {
      var searchInput;
      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          this.doSearch();
        }
      }
    
      return <input key='searchInput' value={this.state.searchInput} onChange={(e) => this.handleChange(e)} style={{ fontFamily: 'TwReg', borderTopRightRadius: 90, borderBottomRightRadius: 90,  display: 'flex', width: 320, backgroundColor: '#1c1c1c', paddingRight: '32px', border: 0, transform: 'none', color: 'white', boxShadow: 'none', outline: 'none', fontSize: 16 }} type='text' name='search' placeholder='Search for films...' onKeyDown={handleKeyDown}></input>
    }
    
    return (
      <div>
        {
          this.state.nominees[4] != null ?
          <div style={{ position: 'absolute', width: '100vw', height: 36, backgroundColor: '#5e8e3e', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography style={{ display: 'flex', letterSpacing: 4, fontWeight: 800, fontFamily: 'TwBold', height: '36px', fontSize: 16, color: '#fff', alignItems: 'center' }}>YOU'VE NOMINATED 5 FILMS! THANKS FOR VISITING!</Typography>
          </div>
          :
          null
        }
        <div style = {{ height: '100%', width: '100%', display: this.state.display, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.9)', }}>
          <div style={{ display: 'flex', height: '100vh', width: '100vw', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', maxHeight: '75%', flex: 1, justifyContent: 'center', }}>
                <div style={{ backgroundColor: '#3e3e3e', height: 480, width: 480, borderRadius: 32, display: 'flex', flexDirection: 'column', }}>
                  {/* <Typography align='center' style={{ fontFamily: 'TwReg', paddingLeft: 8, paddingRight: 8, fontSize: 16, color: 'white', lineHeight: 1.25 }}>The Lord of the Rings: The Return of the King</Typography> */}
                  {/* <Typography style={{ fontSize: 12, color: 'white' }}>(2019)</Typography> */}
                  <div style={{ backgroundImage: `url(${this.state.currMoviePoster})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', display: 'flex', flex: 0.7, backgroundColor: '#101010', borderTopLeftRadius: 32, borderTopRightRadius: 32, opacity: 0.5, backgroundPosition: 'center' }}>
                    {/* <img src={TestMovie} style={{ width: 480, height: 'auto' }} /> */}
                  </div>
                  <div style={{ display: 'flex', flex: 0.3, flexDirection: 'column', paddingTop: 16, paddingLeft: 24, paddingRight: 24 }}>
                    <Typography style={{ fontFamily: 'TwBold', fontWeight: 400, fontSize: 18, color: '#fff' }}>{this.state.currMovie}</Typography>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'flex-end', width: '50%', marginTop: 4 }}>
                      <Typography style={{ fontFamily: 'TwReg', fontSize: 16, color: '#939393' }}>{this.state.currMovieYear}</Typography>
                    </div>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <Typography onClick={() => this.overlayOff()} style={{ fontFamily: 'TwBold', fontSize: 16, color: '#fff', cursor: 'pointer' }}>Close</Typography>
                      {
                      this.state.type == 'search' ?
                      <div style={this.state.currNom != 5 ? { cursor: 'pointer', display: 'flex', flexDirection: 'column', backgroundColor: '#1d1d1d', height: 36, justifyContent: 'center', alignItems: 'center', width: 120, borderRadius: 45 } : { display: 'flex', flexDirection: 'column', height: 36, justifyContent: 'center', alignItems: 'center', width: 120, borderRadius: 45 }}>
                        <Typography onClick={this.state.currNom != 5 ? () => this.setNominee(this.state.currMovie, this.state.currMovieYear, this.state.currMoviePoster) : () => this.overlayOff()} style={this.state.currNom != 5 ? { fontFamily: 'TwBold', fontSize: 18, color: '#fff',  } : { fontFamily: 'TwBold', fontSize: 16, color: '#939393' }}>{this.state.currNom != 5 ? 'Nominate' : 'Nominations full!'}</Typography>
                      </div>
                      :
                      <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', height: 36, justifyContent: 'center', alignItems: 'center', width: 180, borderRadius: 45 }}>
                        <Typography onClick={() => this.delNominee([this.state.currMovie, this.state.currMovieYear, this.state.currMoviePoster])} style={{ fontFamily: 'TwBold', fontWeight: 400, fontSize: 18, color: '#c70039',  }}>{'Remove nomination'}</Typography>
                      </div>
                      }
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: '#101010', height: '90vh', width: '90vw', display: 'flex', flexDirection: 'column', paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '5vh', paddingBottom: '5vh' }}>
        <div style={{ flex: 0.45, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 0.2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              <img src={ShopifyBag} style={{ width: 40, height: 'auto' }} />
            </div>
            <div>
              {/* <NotificationsActiveIcon style={{ color: 'white', width: 40, height: 'auto' }} /> */}
            </div>
          </div>
          <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'center'  }}>
            {/* <h1>Nominate your favorite films for The Shoppies.</h1>
            <h2>Make up to five selections.</h2> */}
            <div style={{ display: 'flex', flexDirection: 'column', }}>
              <Typography style={{ fontFamily: 'TwBold', fontSize: 72, color: 'white' }}>Nominate your favorite films for The Shoppies</Typography>
              <Typography style={{ fontFamily: 'TwReg', fontSize: 36, color: '#909090' }}>Make up to five selections.</Typography>
            </div>
          </div>
        </div>
        <div style={{ flex: 0.55, display: 'flex', flexDirection: 'row', }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 0.55, }}>
            <div style={{ display: 'flex', height: '36px', flexDirection: 'row', }}>
              <div style={{ backgroundColor: '#1c1c1c', height: 'auto', width: '48px', borderTopLeftRadius: 90, borderBottomLeftRadius: 90, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <SearchIcon style={{ color: '#777777' }} />
              </div>
              {/* <input style={{ fontFamily: 'TwReg', borderTopRightRadius: 90, borderBottomRightRadius: 90,  display: 'flex', width: 320, backgroundColor: '#1c1c1c', paddingRight: '32px', border: 0, transform: 'none', color: 'white', boxShadow: 'none', outline: 'none', fontSize: 16 }} type='text' name='search' placeholder='Search for films...' onSubmit={() => console.log('bruh')}></input> */}
              {Input()}
            </div>
            <div style={{ marginTop: 32, backgroundColor: '#1c1c1c', flex: 0.9, display: 'flex', flexDirection: 'column', borderRadius: 32, marginRight: 32, }}>
              { this.state.searchQuery != '' ?
                <div style={{ paddingTop: 24, paddingLeft: 6, display: 'flex', flex: 1, flexDirection: 'column', }}>
                  <Typography style={{ fontFamily: 'TwBold', fontSize: 16, color: '#939393', paddingLeft: 24, marginBottom: 12 }}>Search results</Typography>
                  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap', maxHeight: 420, overflowY: 'scroll' }}>
                    {this.state.searchBoxes}
                  </div>
                </div>
              :
              <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{ fontFamily: 'TwBold', fontSize: 16, color: '#939393' }}>Start a search for results</Typography>
              </div>
              }
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 0.45, marginLeft: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
              <Typography style={{ paddingLeft: 32, letterSpacing: 4, fontWeight: 800, fontFamily: 'TwBold', display: 'flex', height: '36px', fontSize: 16, color: '#909090', alignItems: 'center' }}>NOMINATIONS</Typography>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', }}>
              <div style={{ display: 'flex', flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                {this.renderNominees(0)}
                {this.renderNominees(1)}
                {this.renderNominees(2)}
              </div>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', paddingLeft: 64, paddingRight: 64 }}>
                {this.renderNominees(3)}
                {this.renderNominees(4)}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
