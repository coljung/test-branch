import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Layout, Icon } from 'antd';
import HeaderContent from './common/HeaderContent';
import NavigationMain from './common/NavigationMain';

const { Content, Header, Sider } = Layout;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { collapsed: true, showStoreModal: true };
    }

    toggle() {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed });
        clearTimeout(this.timer);

        // collapse after 8 seconds
        if (!collapsed) {
            this.timer = setTimeout(() => {
                this.setState({ collapsed: !collapsed });
            }, 8000);
        }
    }

    render() {
        return (
            <div className="store_layout">
                <Header>
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={ this.toggle.bind(this) } />
                    <HeaderContent />
                </Header>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}>

                        <NavigationMain pathname={this.props.location.pathname} />
                    </Sider>
                    <Content>
                        <main style={{ flex: 1, overflowY: 'auto', padding: 25 }}>
                            <ReactCSSTransitionGroup
                                    component="div"
                                    transitionName="example"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={500}>
                                        {React.cloneElement(this.props.children, {
                                            key: this.props.location.pathname,
                                        })}
                                </ReactCSSTransitionGroup>
                        </main>
                    </Content>
                </Layout>
            </div>
        );
    }

}

App.propTypes = {
    location: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.element),
        React.PropTypes.element,
    ]),
};
