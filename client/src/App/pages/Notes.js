import React from 'react';
import Note from '../components/Note'

class Notes extends React.Component {
    // Initialize the state
    constructor(props){
        super(props);
        this.state = {
            notes: [],
            addNote:{
                title: '',
                content: '',
                color: 'transparent',
                archived: false,
                deleted: false,
                active: false
            }
        }
        this.timer = null;
        this.type = this.props.type;
    }

    // Fetch the notes on first mount
    componentDidMount() {
        this.getNotes();
        setTimeout(this.update, 100);
    }

    update = () => {
        if (this.type !== this.props.type) {
            this.type = this.props.type;
            this.getNotes();
        }
        setTimeout(this.update, 100);
    }

    getNotes = () => {
        let type = this.props.type && this.props.type !== 'notes' ? '/' + this.props.type : '';
        fetch('/api/notes' + type)
        .then(response => response.json())
        .then(notes => {
            this.setState({ notes: notes.data })
        });
    }

    editTitle = (e) => {
        this.setState(prevState => ({
            addNote: {
                ...prevState.addNote,
                title: e.target.value
            }
        }))
    }

    editContent = (e) => {
        this.setState(prevState => ({
            addNote: {
                ...prevState.addNote,
                content: e.target.value
            }
        }))
    }

    // setColor = (c) => {
        // this.setState(prevState => ({
        //     addNote: {
        //         ...prevState.addNote,
        //         color: e.target.value
        //     }
        // }))
    // }

    addNote = () => {

        if (this.state.addNote.title || this.state.addNote.content) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.addNote)
            };
            fetch('/api/notes/', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
            this.setState({
                addNote: {
                    title: '',
                    content: '',
                    color: 'transparent',
                    archived: false,
                    deleted: false,
                    active: false
                }
            });
            this.getNotes();
        }
        this.setState(prevState => ({
            addNote: {
                ...prevState.addNote,
                active: false
            }
        }))
    }

    activate = () => {
        clearTimeout(this.timer)
        this.setState(prevState => ({
            addNote: {
                ...prevState.addNote,
                active: true
            }
        }))
    }

    render() {
        return (
            <div className="content">
                { this.props.type === 'notes' &&
                    <div className={this.state.addNote.active ? 'add-note active' : 'add-note'}
                        onFocus={(e) => this.activate()}
                        onBlur={(e) => {this.timer = setTimeout(this.addNote,100)}}
                        >
                        <input
                            className="note-title"
                            value={this.state.addNote.title || ''}
                            onChange={(e) => this.editTitle(e)}
                            placeholder="Title" />
                        <textarea
                            className="note-content"
                            onChange={(e) => this.editContent(e)}
                            value={this.state.addNote.content || ''}
                            placeholder="Take a note..."
                        ></textarea>
                    </div>
                }
                <div className="notes">
                    {this.state.notes.map((note) => {
                      return <Note key={`note-${note.id}`} note={note} update={this.getNotes} />;
                    })}
                </div>
            </div>
        )
    }
}

export default Notes;
