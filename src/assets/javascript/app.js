
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
            <div>
                ID: { userEvent.id }<br />
                Mouse X: { userEvent.mousePosX }<br />
                Mouse Y: { userEvent.mousePosY }<br />
                Background Color: { userEvent.backgroundColor }
            </div>
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

        console.warn(this.props);

        var storedEvents = this.props.storedEvents;

        var eventTiles = storedEvents.map(function(evt) {
            return (
                <li className="Tile" key={ evt.id }>
                    <Tiles userEvent={ evt }  />
                </li>
            );
        });

        return  (
            <div className={ this.props.classes }>
                <div className="Tiles">
                    <ul className="list reset">
                        { eventTiles }
                    </ul>
                </div>
                <div className="TileHistory-tab">
                    <button className="TileHistory-view-toggler" onClick={ this.props.uiShowEventHistory }>Show History</button>
                </div>
            </div>
        );
    }
});

// App
var TouchyTouchyUI = React.createClass({

    getDefaultProps: function() {
        return {
            historyViewEnabled: false,
            userHistory: new UserHistory(),
            lastEvent: null
        }
    },

    getInitialState: function() {
        return {
            showclickTrail: false
        }
    },

    uiInterfaceClick: function(evt) {
        console.warn('uiInterfaceClick');
        evt.preventDefault();

        if(!this.state.historyViewEnabled) {

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
        }  
    },

    uiShowEventHistory: function(evt) {
        console.warn('uiShowEventHistory');
        evt.preventDefault();
        evt.stopPropagation();
        this.setState({ historyViewEnabled: !this.state.historyViewEnabled });
    },

    render: function() {

        var clickTrail = null;
        var colorScheme = null;
        var storedUserEvents = this.props.userHistory.get('events');
        var tileHistoryClassSet = utils.classNames(
            'TileHistory',
            { 'is-hidden': this.state.historyViewEnabled }
        );
        var tileHistory = storedUserEvents.length ?
            <TileHistory
                uiShowEventHistory={ this.uiShowEventHistory }
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
