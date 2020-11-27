import React from "react";

class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.note.id || '',
			title: props.note.title || '',
			content: props.note.content,
			color: props.note.color,
			archived: props.note.archived || 0,
			deleted: props.note.deleted || 0,
			active: false
		};
		this.timer = null;
	}


	editTitle = (e) => {
		clearTimeout(this.timer);
		this.setState({ title: e.target.value });
		this.timer = setTimeout(this.sendUpdate, 1000);
	}

	editContent = (e) => {
		clearTimeout(this.timer);
		this.setState({ content: e.target.value });
		this.timer = setTimeout(this.sendUpdate, 1000);
	}

	setColor = (c) => {
		clearTimeout(this.timer);
		this.setState({ color: c });
		this.timer = setTimeout(this.sendUpdate, 1000);
	}

	sendUpdate = () => {
		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify(this.state)
	    };
	    fetch('/api/notes/' + this.state.id, requestOptions)
	        .then(response => response.json())
	        .then(data => console.log(data))
			.then(this.props.update());
	}

	activate = () => {
		this.setState({ active: true });
	}

	deactivate = () => {
		this.setState({ active: false });
	}

	archive = () => {
		clearTimeout(this.timer);
		this.setState({ archived: !this.state.archived });
		this.timer = setTimeout(this.sendUpdate, 100);
	}
	delete = () => {
		clearTimeout(this.timer);
		this.setState({ deleted: !this.state.deleted });
		this.timer = setTimeout(this.sendUpdate, 100);
	}

	render() {
		return (
			<div
				className={this.state.active? 'note-container active' : 'note-container'}
				onFocus={(e) => this.activate()}
				>

				<div className="note" style={{background:this.state.color}}>
					<div className="close" onClick={(e) => this.deactivate()}></div>
					<input
						className="note-title"
						value={this.state.title}
						onChange={(e) => this.editTitle(e)} />
					<textarea
						className="note-content"
						onChange={(e) => this.editContent(e)}
						value={this.state.content}
					></textarea>
					<div className="buttons">
						<div className="colors">
							🎨
							<div className="color-picker">
								<div className="transparent" alt="Transparent"></div>
								<div onClick={(e) => this.setColor('#5c2b29')} style={{background:'#5c2b29'}} alt="Red"></div>
								<div onClick={(e) => this.setColor('#614a19')} style={{background:'#614a19'}} alt="Orange"></div>
								<div onClick={(e) => this.setColor('#635d19')} style={{background:'#635d19'}} alt="Yellow"></div>
								<div onClick={(e) => this.setColor('#345920')} style={{background:'#345920'}} alt="Green"></div>
								<div onClick={(e) => this.setColor('#16504b')} style={{background:'#16504b'}} alt="Teal"></div>
								<div onClick={(e) => this.setColor('#2d555e')} style={{background:'#2d555e'}} alt="Blue"></div>
								<div onClick={(e) => this.setColor('#1e3a5f')} style={{background:'#1e3a5f'}} alt="Dark Blue"></div>
								<div onClick={(e) => this.setColor('#42275e')} style={{background:'#42275e'}} alt="Purple"></div>
								<div onClick={(e) => this.setColor('#5b2245')} style={{background:'#5b2245'}} alt="Pink"></div>
								<div onClick={(e) => this.setColor('#442f19')} style={{background:'#442f19'}} alt="Brown"></div>
								<div onClick={(e) => this.setColor('#3c3f43')} style={{background:'#3c3f43'}} alt="Gray"></div>
							</div>
						</div>
						<div onClick={ (e) => this.archive() } alt="Archive">📁</div>
						<div onClick={ (e) => this.delete() } alt="Delete">🗑️</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Note;

// export default connect(
//   null,
//   { toggleNote, editNote }
// )(Note);
/*<span className="toggle" onClick={() => this.props.toggleNote(this.state.id)}>this.state.completed ? "☑" : "☐"}{" "}</span>*/
