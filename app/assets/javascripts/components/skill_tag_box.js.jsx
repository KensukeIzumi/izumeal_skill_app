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

  callPostApi: function(url, data) {
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(result) {
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
  
  handleSkillTagSubmit: function(skillTag) {
    const data = {
      user_id: this.state.user.id,
      added_by: this.state.currentUser.id,
      skill_tag: skillTag,
    }
    this.callPostApi(`/api/v1/skill_tags`, data)
  },

  handleAddSkillCount: function(skillTagId) {
    const data = {
      user_id: this.state.user.id,
      added_by: this.state.currentUser.id,
      skill_tag_id: skillTagId,
    }
    this.callPostApi(`/api/v1/user_skill_tags`, data)
  },

  render: function() {
    return (
      <div className='skillTagBox'>
        <h2>AddedSkillTags</h2>
        <SkillAddButton
          handleSkillTagSubmit={this.handleSkillTagSubmit}
          handleAddSkillCount={this.handleAddSkillCount}
        />
        <AddedSkillTagList 
          addedSkillTags={this.state.user.added_skill_tags}
          userId={this.state.user.id}
          currentUserId={this.state.currentUser.id}
          handleAddSkillCount={this.handleAddSkillCount}
        />
      </div>
    );
  }
});

const AddedSkillTagList = React.createClass({
  render: function() {
    addedSkillTagsSortedByCount = this.props.addedSkillTags.sort(function(a, b) {
      return (a.count > b.count) ? -1 : 1
    })
    return (
      <div className='addedSkillTagList'>
        <ul>
          {addedSkillTagsSortedByCount.map((addedSkillTag, index) => {
            return (<AddedSkillTag
              key={addedSkillTag.id}
              addedSkillTag={addedSkillTag}
              userId={this.props.userId}
              currentUserId={this.props.currentUserId}
              handleAddSkillCount={this.props.handleAddSkillCount}
            />)
          })}
        </ul>
      </div>
    )
  }
});

const AddedSkillTag = React.createClass({
  renderAddSkillCount: function() {
    if (this.props.userId !== this.props.currentUserId) {
      return (
        <SkillCountAddButton 
          skillTagId={this.props.addedSkillTag.id}
          handleAddSkillCount={this.props.handleAddSkillCount}
        />
      )
    } else {
      return null
    }
  },
   
  render: function() {
    const { addedSkillTag } = this.props
    return <li key={addedSkillTag.id}>{addedSkillTag.count} {addedSkillTag.name} { this.renderAddSkillCount() }</li>;
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

const SkillCountAddButton = React.createClass({
  handleClick: function(e) {
    e.preventDefault()
    this.props.handleAddSkillCount(this.props.skillTagId)
  },

  render: function() {
    return (
      <button onClick={this.handleClick} >+plus!</button>
    )
  }
})
