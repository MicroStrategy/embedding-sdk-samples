
import Menu from "./Menu"
import Content from "./Content"
import React, { Component } from 'react'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pageName: "Embedding SDK Example - Page Navigation"
    }
  }

  componentDidMount() {
             
    const container = document.getElementById("content-container")

    let updateTitle = (data) => {
      
      this.setState((_) => {
        const currCh = window.dossier.children[window.dossier.currentChapterIndex]
        const currPage = currCh.children[currCh.currentPageIndex]
        return {
          pageName: "Embedding SDK Example - " + currPage.name
        }
      })
    }
    window.microstrategy.dossier.create({
        url:"https://demo.microstrategy.com/MicroStrategyLibrary/app/EC70648611E7A2F962E90080EFD58751/837B57D711E941BF000000806FA1298F",
        enableResponsive: true,
        containerHeight: '1000px',
        placeholder: container
    }).then((dossier) => {
        dossier.registerEventHandler(window.microstrategy.dossier.EventType.ON_PAGE_SWITCHED, updateTitle);
        window.dossier = dossier
        window.menu.updateDossier()
        updateTitle()

    }); 
  }

  render() {

    return (
      
      <div className="grid-container" id="grid-container">
        <div className="header-container"><h2>{this.state.pageName}</h2></div>
        <Menu></Menu>
        <Content></Content>

      </div>
    );
  }
}

export default App;
