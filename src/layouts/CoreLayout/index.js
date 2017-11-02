const React = require('react');
const Header = require('../../components/Header');
const Classes = require('./styles.scss');

const HomeComponent = require('routes/home/components/HomeView.js');
const CounterComponent = require('routes/counter/containers/Counter.js');
const Switch = require('react-router-dom').Switch;
const Route = require('react-router-dom').Route;

// Pull global styles
require('../../styles/core.scss');

const CoreLayout = () => (

    <div className='container text-center'>
        <Header />
        <div className={Classes.mainContainer}>
            <Switch>
                <Route exact path='/' component={HomeComponent} />
                <Route exact path='/counter' component={CounterComponent} />
            </Switch>
        </div>
    </div>
);

module.exports = CoreLayout;
