import React from 'react';
import { NotificationManager } from '../notifications/NotificationManager';

export default class Board extends React.Component {
    render() {
        let boardTitle = null;
        if (this.props.btnInTitle) {
            boardTitle = (
                <div className='clearfix titleWithButton'>
                    <h2>{this.props.title}</h2>
                    {this.props.btnInTitle}
                </div>
            );
        } else {
            boardTitle = (<h2>{this.props.title}</h2>);
        }
        return (
            <div className='board' id={this.props.id}>
                <NotificationManager />
                {boardTitle}
                {this.props.children}
            </div>
        );
    }
}

Board.propTypes = {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.element),
        React.PropTypes.element,
    ]).isRequired,
    id: React.PropTypes.string,
    btnInTitle: React.PropTypes.element,
};

Board.defaultProps = {
    btnInTitle: null,
    id: '',
};
