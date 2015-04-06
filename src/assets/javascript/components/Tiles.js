
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
