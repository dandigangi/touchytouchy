
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

        var timestamp = new Date();
        var newEvent = {
            timestamp: String(timestamp),
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
                                <img src="build/assets/images/resource-js.jpg" />
                            </a>
                        </li>
                        <li className="react">
                            <a href="http://facebook.github.io/react/" target="_blank">
                                <img src="build/assets/images/resource-react.jpg" />
                            </a>
                        </li>
                        <li className="sass">
                            <a href="http://sass-lang.com/" target="_blank">
                                <img src="build/assets/images/resource-sass.jpg" />
                            </a>
                        </li>
                        <li className="gulp">
                            <a href="http://gulpjs.com/" target="_blank">
                                <img src="build/assets/images/resource-gulp.jpg" />
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
