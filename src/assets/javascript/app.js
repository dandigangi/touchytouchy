
// Utilities
var generateHexColor = function() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Components
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

var TouchyTouchyUI = React.createClass({

    getDefaultProps: function() {
        return {
            lastEvent: null,
            backgroundColor: null
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
            mousePosX: evt.clientX,
            mousePosY: evt.clientY
        };

        this.setState({ showclickTrail: true });
        this.setProps({
            lastEvent: newEvent,
            backgroundColor: generateHexColor()
        });
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

// Kickoff
React.render(
  <TouchyTouchyUI />,
  document.getElementById('TouchyTouchyUI')
);
