import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetCurrentStore, setStoreFromStorage } from '../stores/StoreActions';
import HeaderContent from './common/HeaderContent';
import SelectStoreModal from '../stores/SelectStoreModal';
import NavigationMain from './common/NavigationMain';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import enUS from 'antd/lib/locale-provider/en_US';
import { Layout, Icon, LocaleProvider } from 'antd';
import { ROUTE_STORE_LIST } from '../Routes';

const { Content, Header, Sider } = Layout;

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = { collapsed: true, showStoreModal: true };
    }

    componentDidMount() {
        if (!this.props.currentStore) {
            this.props.setStoreFromStorage();
        }
    }

    componentWillReceiveProps(props) {
        if (props.currentStore) {
            this.setState({ showStoreModal: false });
        }

        // when the route changes in order to create a store and no store is selected
        if (!props.currentStore && props.location.pathname !== `${ROUTE_STORE_LIST}/new` && props.location.pathname !== this.props.location.pathname) {
             this.setState({ showStoreModal: true });
        }
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

    showStoreModal() {
        this.props.resetCurrentStore();
        this.setState({ showStoreModal: true });
    }

    hideStoreModal() {
        this.setState({ showStoreModal: false });
    }

    renderAll() {
        return (
            <LocaleProvider locale={enUS}>
                <div className="store_layout">
                    <Header>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={ this.toggle.bind(this) } />
                        <HeaderContent onStoreSelectClick={this.showStoreModal.bind(this)} />
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
            </LocaleProvider>
        );
    }

    render() {
        if (this.state.showStoreModal) {
            return <SelectStoreModal onHideStoreModal={this.hideStoreModal.bind(this)} />;
        }
        return this.renderAll();
    }
}

function mapStateToProps(state) {
	return { currentStore: state.StoreReducer.currentStore };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ resetCurrentStore, setStoreFromStorage }, dispatch);
}

App.propTypes = {
    location: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.element),
        React.PropTypes.element,
    ]),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
