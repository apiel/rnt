import React from 'react';
import addons from '@storybook/addons';
// import styled from '@emotion/styled';

export const ADDON_ID = 'storybook-addon-storyshot-view';
export const PANEL_ID = `${ADDON_ID}/storyshot-view-panel`;
export const EVENT_ID = `${ADDON_ID}/storyshot-view-event`;

// const NotesPanel = styled.div({
//     margin: 10,
//     width: '100%',
//     overflow: 'auto',
// });

export class Yo extends React.Component {
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
        }
    }

    componentDidMount() {
        this.props.channel.on(EVENT_ID, this._listener);
        this.props.api.onStory((data) => this.setState({ storyName: null, results: { wrongResults: [], goodResults: [] } }));
    }

    componentWillUnmount() {
        this.props.channel.removeListener(EVENT_ID, this._listener);
    }

    render() {
        const results = this.state.results;
        return <div results={results}>blah</div>;
    }
}

export function register() {
    addons.register(ADDON_ID, api => {
        const channel = addons.getChannel();
        addons.addPanel(PANEL_ID, {
            title: 'Storyshot',
            // render: () => <NotesPanel>abc</NotesPanel>
            render: () => <Yo channel={channel} api={api} />,
        });
    });
}



// class Notes extends React.Component {
//     state = {
//         text: '',
//     };

//     onAddNotes = text => {
//         this.setState({ text });
//     };

//     componentDidMount() {
//         const { channel, api } = this.props;
//         // Listen to the notes and render it.
//         channel.on('MYADDON/add_notes', this.onAddNotes);

//         // Clear the current notes on every story change.
//         this.stopListeningOnStory = api.onStory(() => {
//             this.onAddNotes('');
//         });
//     }

//     render() {
//         const { text } = this.state;
//         const { active } = this.props;
//         const textAfterFormatted = text ? text.trim().replace(/\n/g, '<br />') : '';

//         return active ? <NotesPanel dangerouslySetInnerHTML={{ __html: textAfterFormatted }} /> : null;
//     }

//     // This is some cleanup tasks when the Notes panel is unmounting.
//     componentWillUnmount() {
//         if (this.stopListeningOnStory) {
//             this.stopListeningOnStory();
//         }

//         this.unmounted = true;
//         const { channel, api } = this.props;
//         channel.removeListener('MYADDON/add_notes', this.onAddNotes);
//     }
// }

// // Register the addon with a unique name.
// addons.register('MYADDON', api => {
//     // Also need to set a unique name to the panel.
//     addons.addPanel('MYADDON/panel', {
//         title: 'Notes',
//         render: ({ active }) => <Notes channel={addons.getChannel()} api={api} active={active} />,
//     });
// });