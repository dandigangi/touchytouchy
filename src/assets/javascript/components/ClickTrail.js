
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
