
// Utilities
var generateHexColor = function() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Data
// TODO: Backend storage (thinking MongoDB)
// TODO: Move data structures into ImmutableJS (once stored ^)
window.UserHistory = function() {
    var instance = this;
    return instance;
};

// Inits a new event history if one does not exist or the previous is destroyed
UserHistory.prototype.create = function() {

    if (!this.history) {
        this.prototype.history = {
            events: {},
            count: 0
        }
    }

    return this;
};

// Destory the current event history and create() another
UserHistory.prototype.destroy = function() {

    if (this.history) {
        this.history = {};
    }

    return this;
};

// Store a new event in the user's event history
UserHistory.prototype.store = function(newEvent) {

    if (!this.history) {
        this.create();
    }

    _.assign(this.history.events, newEvent);

    return this;
};

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
    render: function() {
        return  (
            <li>Tile</li>
        );
    }
});

var TileHistory = React.createClass({
    render: function() {
        return  (
            <ul>
                <Tiles />
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

        this.setState({ showclickTrail: true });

        this.setProps({
            lastEvent: newEvent
        });

        this.props.userHistory.store(this.props.lastEvent);
    },

    render: function() {

        var lastEvent = null;
        var colorScheme = null;

        this.props.lastEvent ? lastEvent = this.props.lastEvent : null;
        this.props.backgroundColor ? colorScheme = this.props.backgroundColor : null;

        return (
            <div className="AppInterface" onClick={ this.handleClick } style={{ backgroundColor: colorScheme }}>
                <ClickTrail lastEvent={ lastEvent } />
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
