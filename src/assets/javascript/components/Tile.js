
var Tile = React.createClass({

    propTypes: {
        userEvent: React.PropTypes.object
    },

    uiDeleteTile: function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    },

    render: function() {

        var userEvent = this.props.userEvent;

        return (
            <li className="Tile">
                <div className="Tile-container" style={{ backgroundColor: userEvent.backgroundColor }}>
                    <button onClick={ this.uiDeleteTile } className="btn delete icon- Tile-delete">x</button>
                        <div className="Tile-id">#{ userEvent.id }</div>
                        <p className="Tile-coordinates">Coordinates:<br />({ userEvent.mousePosX }, { userEvent.mousePosY })</p>
                        <p className="Tile-timestamp">Time:<br />{ userEvent.timestamp }</p>
                </div>
            </li>
        );
    }
});
