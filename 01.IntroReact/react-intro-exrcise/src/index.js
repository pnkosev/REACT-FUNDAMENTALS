import React from 'react';
import ReactDOM from 'react-dom';
import contacts from './contacts.json';

let currentIndex = 0;

function render() {
    ReactDOM.render(
        <Body />,
        document.getElementById('root'));
}

function updateIndex(index) {
    currentIndex = index;
    render();
}

const Header = () => {
    return (
        <header>&#9993; Contact Book</header>
    );
};

const Footer = () => {
    return (
        <footer>Contact Book SPA &copy; 2017</footer>
    );
};

const Contact = (props) => {
    let contactData = props.contactData;
    return contactData.map((contact, index) => 
        <div onClick={() => {updateIndex(index)}} className="contact" data-id="id" key={index}>
            <span className="avatar small">&#9787;</span>
            <span className="title">{contact.firstName} {contact.lastName}</span>
        </div>
    )
};

const Details = (props) => {
    let { index, contactData } = props;

    return (<div className="content">
            <div className="info">
                <div className="col">
                    <span className="avatar">&#9787;</span>
                </div>
                <div className="col">
                    <span className="name">{contactData[index].firstName}</span>
                    <span className="name">{contactData[index].lastName}</span>
                </div>
            </div>
            <div className="info">
                <span className="info-line">&phone; {contactData[index].phone}</span>
                <span className="info-line">&#9993; {contactData[index].email}</span>
            </div>
            </div>)
}

const Body = () => (
    <div className="container">
        <Header />
            <div id="book">
                <div id="list">
                    <h1>Contacts</h1>
                    <div className="content">
                    <Contact contactData={contacts} />
                    </div>
                </div>
                <div id="details">
                    <h1>Details</h1>
                    <Details index={currentIndex} contactData={contacts} />
                </div>
            </div>
        <Footer />
    </div>
)

render();
