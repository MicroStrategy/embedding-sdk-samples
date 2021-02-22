import React, { Component } from 'react';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.updateDossier = this.updateDossier.bind(this);
        this.state = {
        };
        window.menu = this
      }    

    componentDidMount() {
    }
    updateDossier() {
        this.setState( ()=> {
            
            console.log("Update Menu")
            return {
                dossier: window.dossier
            }
        })
    }

    render() {

        const items = []

        if (this.state.dossier) {
            const currentChapterIndex = this.state.dossier.currentChapterIndex;
            this.state.dossier.children.forEach((value, index) => {
                items.push(<Chapter c={value} key={index} current={index===currentChapterIndex}></Chapter>)
            })
        } else {
            items.push(<div key="1">Loading...</div>)
        }

        return (
            <div className="menu-container" id="menu-container">
                {items}
            </div>    
        );
    }
}

class Chapter extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            expended: true
        }
    }   

    handleClick() {
        
        this.setState((preState) => {
            return {
                expended: !preState.expended
            }
        })
    }

    render() {

        const items = []
        this.props.c.children.forEach((value, index) => {
            if (this.props.current) {
                items.push(<Page p={value} key={index} current={this.props.c.currentPageIndex===index}></Page>)

            } else {
                items.push(<Page p={value} key={index} current={false}></Page>)
            }
        })

        const className = "Chapter"

        if (this.state.expended) {
            return (
            <div onClick={this.handleClick}>
                <div className={className}>{this.props.c.name}<span className="ChapterArrow">⬆</span></div>
                <div className="ChapterUL">
                    {items}
                </div>
            </div>  
            )
        } else {
            return (
                <div onClick={this.handleClick}>
                    <div className={className}>{this.props.c.name}<span className="ChapterArrow">⬇</span></div>
                </div>
            )
        }
    }
}

class Page extends Component{

    constructor(props) {
        super(props)
        this.gotoPage = this.gotoPage.bind(this)

    }  

    gotoPage(event) {
       
        window.dossier.navigateToPage(this.props.p).then((data)=> {
             window.menu.updateDossier()
        })
        event.stopPropagation()

    }
    render() {
        const className = this.props.current ? "Page Current": "Page"
        return (
            
                <div className={className} onClick={this.gotoPage}>{this.props.p.name}</div>
            
        )
    }   
}

export default Menu;
