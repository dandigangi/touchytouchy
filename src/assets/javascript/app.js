
// Utilities
var generateHexColor = function() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

var format

// Data
// TODO: Backend storage (thinking MongoDB)
// TODO: Move data structures into ImmutableJS (once stored ^)
window.UserHistory = function() {
    this.create();
    return this;
}

// Inits a new event history if one does not exist or the previous is destroyed
UserHistory.prototype.create = function() {
    this.storage = {
        events: [],
        total: 0
    }

    return this;
}

// Destory the current event history and create() another
UserHistory.prototype.destroy = function() {

    if(this.storage && this.storage.events.length || this.storage.total > 0) {
        this.storage = null;
        this.create();
    }

    return this;
}

// Store a new event in the user's event history
UserHistory.prototype.store = function(newEvent) {

    if(!this.storage) {
        this.create();
    }

    this.storage.total++;
    newEvent.id = this.get('total');
    this.storage.events.push(newEvent);
    return this;
}

UserHistory.prototype.get = function(key) {
    if(this.storage && _.has(this.storage, key)) {
        return this.storage[key];
    }
}

UserHistory.prototype.getFirstEvent = function() {
    return this.get('events').splice(0, 1);
}

UserHistory.prototype.getLastEvent = function() {
    return this.get('events').splice(-1, 1);
}

// React Components
var ClickTrail = React.createClass({

    propTypes: {
        lastEvent: React.PropTypes.object
    },

    render: function() {

        if(this.props.lastEvent) {

            var clickTrailPos = {
                left: this.props.lastEvent.mousePosX,
                top: this.props.lastEvent.mousePosY
            }

            return (
                <div className='click-trail' style={ clickTrailPos }></div>
            );
        } else {
            return null;
        }
    }
});

var Tiles = React.createClass({

    propTypes: {
        userEvent: React.PropTypes.object
    },

    render: function() {

        var userEvent = this.props.userEvent;

        return (
            <p>
                ID: { userEvent.id }<br />
                Mouse X: { userEvent.mousePosX }<br />
                Mouse Y: { userEvent.mousePosY }<br />
                Background Color: { userEvent.backgroundColor }
            </p>
        );
    }
});

var TileHistory = React.createClass({

    propTypes: {
        storedEvents: React.PropTypes.array
    },

    getDefaultProps: function() {
        return {
            storedEvents: []
        }
    },

    render: function() {

        var storedEvents = this.props.storedEvents;

        var eventTiles = storedEvents.map(function(evt) {
            return (
                <li>
                    <Tiles userEvent={ evt }  />
                </li>
            );
        });

        return  (
            <ul>
                { eventTiles }
            </ul>
        );
    }
});

// App
var TouchyTouchyUI = React.createClass({

    getDefaultProps: function() {
        return {
            userHistory: new UserHistory(),
            lastEvent: null
        }
    },

    getInitialState: function() {
        return {
            showclickTrail: false
        }
    },

    handleClick: function(evt) {

        var newEvent = {
            currentTimestamp: Date.now(),
            backgroundColor: generateHexColor(),
            mousePosX: evt.clientX,
            mousePosY: evt.clientY
        };

        this.props.userHistory.store(newEvent);
        this.setState({ showclickTrail: true });
        this.setProps({
            lastEvent: newEvent
        });
    },

    render: function() {

        var storedUserEvents = this.props.userHistory.get('events');
        var tileHistory = storedUserEvents.length ? <TileHistory storedEvents={ storedUserEvents } /> : null;
        var clickTrail = this.props.lastEvent ? <ClickTrail lastEvent={ this.props.lastEvent } /> : null;
        var colorScheme = this.props.backgroundColor ? colorScheme = this.props.backgroundColor : null;

        return (
            <div className="AppInterface" onClick={ this.handleClick } style={{ backgroundColor: colorScheme }}>
                { clickTrail }
                { tileHistory }
                <div className="container titles">
                    <h1>Touchy<span className="inner-copy">Touchy</span></h1>
                    <h2>Give your screen a tap!</h2>
                </div>
                <div className="dev-resources">
                    <span className="title">Made with love and...</span>
                    <ul className="list reset">
                        <li className="javascript">
                            <a href="#">
                                <img src="dist/assets/images/resource-js.jpg" />
                            </a>
                        </li>
                        <li className="react">
                            <a href="http://facebook.github.io/react/" target="_blank">
                                <img src="dist/assets/images/resource-react.jpg" />
                            </a>
                        </li>
                        <li className="sass">
                            <a href="http://sass-lang.com/" target="_blank">
                                <img src="dist/assets/images/resource-sass.jpg" />
                            </a>
                        </li>
                        <li className="gulp">
                            <a href="http://gulpjs.com/" target="_blank">
                                <img src="dist/assets/images/resource-gulp.jpg" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

// Init
React.render(
  <TouchyTouchyUI />,
  document.getElementById('TouchyTouchyUI')
);
