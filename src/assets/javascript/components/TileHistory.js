
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
                <button className="text- TileHistory-delete" onClick={ this.uiDestroyHistory }>
                    Delete History
                </button>
                <div className="tiles">
                    <ul className="list reset">
                        { storedEvents.map(function(storedEvent) {
                            return (
                                <Tile key={ storedEvent.id } userEvent={ storedEvent } />
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
