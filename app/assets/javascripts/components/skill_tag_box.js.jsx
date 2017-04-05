const SkillTagBox = React.createClass({
  getInitialState: function() {
    return { 
      user: { id: '', name: '', added_skill_tags: [] },
      currentUser: this.props.current_user,
    }
  },

  componentDidMount: function() {
    $.ajax({
      url: `/api/v1${location.pathname}`,
      dataType: 'json',
      success: function(result) {
        this.setState({user: result})
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    })
  },
  
  handleSkillTagSubmit: function(skillTag) {
    $.ajax({
      url: `/api/v1/skill_tags`,
      dataType: 'json',
      type: 'POST',
      data: {
        user_id: this.state.user.id,
        added_by: this.state.currentUser.id,
        skill_tag: skillTag,
      },
      success: function(result) {
        console.log('success')
        console.log(result)
        if (result !== null) {
          this.setState(Object.assign({}, this.state, {
            user: { 
              id: this.state.user.id,
              name: this.state.user.name,
              added_skill_tags: [...this.state.user.added_skill_tags, result],
            }
          }))
        } 
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err)
      }.bind(this)
    })
  },
   
  render: function() {
    console.log(this.state)
    return (
      <div className='skillTagBox'>
        <h2>AddedSkillTags</h2>
        <SkillAddButton
          handleSkillTagSubmit={this.handleSkillTagSubmit}
        />
        <AddedSkillTagList 
          addedSkillTags={this.state.user.added_skill_tags}
        />
      </div>
    );
  }
});

const AddedSkillTagList = React.createClass({
  render: function() {
    return (
      <div className='addedSkillTagList'>
        <ul>
          {this.props.addedSkillTags.map((addedSkillTag, index) => {
            return (<AddedSkillTag
              key={addedSkillTag.id}
              addedSkillTag={addedSkillTag}
            />)
          })}
        </ul>
      </div>
    )
  }
});

const AddedSkillTag = React.createClass({
  render: function() {
    const { addedSkillTag } = this.props
    return <li key={addedSkillTag.id}>{addedSkillTag.count} {addedSkillTag.name}</li>;
  }
});

const SkillAddButton = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault()
    this.props.handleSkillTagSubmit(this.newSkillTag.value.trim())
  },

  render: function() {
    return (
      <form className='skillForm' onSubmit={this.handleSubmit}>
        <input type='text' placeholder='your new skill' ref={(ref) => this.newSkillTag = ref} />
        <input type='submit' value='Add' />
      </form>
    )
  }
})
