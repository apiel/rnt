import React from 'react';
import addons from '@storybook/addons';
import styled from '@emotion/styled';

export const ADDON_ID = 'storybook-addon-storyshot-view';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const EVENT_ID = `${ADDON_ID}/event`;

const StyledPanel = styled.div({
    margin: 10,
    width: '100%',
    overflow: 'auto'
});

export class Panel extends React.Component {
    constructor(props, ...args) {
        super(props, ...args);
        this.state = { storyName: null, results: { wrongResults: [], goodResults: [] } };
        this._listener = ({ asyncResultsUpdate, storyName, results }) => {
            if (asyncResultsUpdate) {
                if (storyName === this.state.storyName) {
                    this.setState({ results });
                }
            } else {
                this.setState({ storyName, results });
            }
        };
    }

    componentDidMount() {
        console.log('was ist 2');

        this.props.channel.on(EVENT_ID, this._listener);
        this.props.api.onStory(data => this.setState({ storyName: null, results: { wrongResults: [], goodResults: [] } }));
    }

    componentWillUnmount() {
        this.props.channel.removeListener(EVENT_ID, this._listener);
    }

    render() {
        const results = this.state.results;
        console.log('resultsresults', results);
        return React.createElement(
            StyledPanel,
            null,
            'blah'
        );
    }
}

export function register() {
    console.log('was ist');
    debugger;
    addons.register(ADDON_ID, api => {
        const channel = addons.getChannel();
        addons.addPanel(PANEL_ID, {
            title: 'Storyshot',
            render: () => React.createElement(Panel, { channel: channel, api: api })
        });
    });
}