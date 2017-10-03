const React = require('react');
const Header = require('../../components/Header');
const Switch = require('react-router-dom').Switch;
const Route = require('react-router-dom').Route;

const Home = require('../../routes/home/components/HomeView');
const CounterRoute = require('../../routes/counter/containers/Counter');

const Classes = require('./styles.scss');

// Pull global styles
require('../../styles/core.scss');

// const CoreLayout = ({ children }) => (
const CoreLayout = () => (

    <div className='container text-center'>
        <Header />
        <div className={Classes.mainContainer}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/counter" component={CounterRoute} />
            </Switch>
        </div>
    </div>

);
module.exports = CoreLayout;
{/*
CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
};
*/}


