
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
                <div className="ClickTrail" style={ clickTrailPos }></div>
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
            <div className="container" style={{ backgroundColor: userEvent.backgroundColor }}>
                <div className="event-id">#{ userEvent.id }</div>
                <p className="event-coordinates">
                    Coordinates:<br />
                    ({ userEvent.mousePosX }, { userEvent.mousePosY })
                </p>
            </div>
        );
    }
});

var TileHistory = React.createClass({

    propTypes: {
        clickHandlers: React.PropTypes.object,
        storedEvents: React.PropTypes.array
    },

    getDefaultProps: function() {
        return {
            storedEvents: []
        }
    },

    uiDestroyHistory: function(evt) {
        evt.preventDefault();
        this.props.storedEvents = [];
        this.props.clickHandlers.uiDestroyHistory();
        this.props.clickHandlers.uiShowEventHistory(evt);
    },

    render: function() {

        var storedEvents = this.props.storedEvents;

        return  (
            <div
                className={ this.props.classes }
                onClick={ this.props.clickHandlers.uiStopPropagation }>
                <div className="container titles">
                    <h3>Click Event History</h3>
                    <h4>We stored some information about how you clicked this app&#39;s interface</h4>
                </div>
                <button className="TileHistory-delete" onClick={ this.uiDestroyHistory }>
                    Delete History
                </button>
                <div className="Tiles">
                    <ul className="list reset">
                        { storedEvents.map(function(storedEvent) {
                            return (
                                <li className="Tile" key={ storedEvent.id }>
                                    <Tiles userEvent={ storedEvent }  />
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="TileHistory-tab">
                    <button
                        onClick={ this.props.clickHandlers.uiShowEventHistory }
                        className="TileHistory-view-toggle">Show History</button>
                </div>
            </div>
        );
    }
});

// App
var TouchyTouchyUI = React.createClass({

    // Props & state
    getDefaultProps: function() {
        return {
            lastEvent: null,
            userHistory: new UserHistory()
        }
    },

    getInitialState: function() {
        return {
            historyViewEnabled: false,
            showclickTrail: false
        }
    },

    // Interface initiated events
    uiInterfaceClick: function(evt) {
        evt.preventDefault();

        var newEvent = {
            currentTimestamp: Date.now(),
            backgroundColor: utils.generateHexColor(),
            mousePosX: evt.clientX,
            mousePosY: evt.clientY
        };

        this.props.userHistory.store(newEvent);
        this.setState({ showclickTrail: true });
        this.setProps({
            lastEvent: newEvent
        });
    },

    uiShowEventHistory: function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.setState({ historyViewEnabled: !this.state.historyViewEnabled });
    },

    uiDestroyHistory: function() {
        this.props.userHistory.destroy();
    },

    uiStopPropagation: function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    },

    // Render
    render: function() {
        var clickTrail = null;
        var colorScheme = null;
        var storedUserEvents = this.props.userHistory.get('events');
        var tileHistoryClickHandlers = {
            uiShowEventHistory: this.uiShowEventHistory,
            uiDestroyHistory: this.uiDestroyHistory,
            uiStopPropagation: this.uiStopPropagation
        };
        var tileHistoryClassSet = utils.classNames(
            'TileHistory',
            { 'is-hidden-translateY': !this.state.historyViewEnabled }
        );
        var tileHistory = storedUserEvents.length ?
            <TileHistory
                userHistory={ this.props.userHistory }
                clickHandlers={ tileHistoryClickHandlers }
                storedEvents={ storedUserEvents }
                classes={ tileHistoryClassSet } />
            : null;

        if(this.props.lastEvent) {
            clickTrail = <ClickTrail lastEvent={ this.props.lastEvent } />;
            colorScheme = this.props.lastEvent.backgroundColor;
        }

        return (
            <div className="AppInterface" onClick={ this.uiInterfaceClick } style={{ backgroundColor: colorScheme }}>
                { tileHistory }
                { clickTrail }
                <div className="container hero-titles">
                    <div className="titles">
                        <h1>Touchy<span className="inner-copy">Touchy</span></h1>
                        <h2>Give your screen a tap!</h2>
                    </div>
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
