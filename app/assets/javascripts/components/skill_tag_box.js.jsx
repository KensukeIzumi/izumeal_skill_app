const SkillTagBox = React.createClass({
  getInitialState: function() {
    return {addedSkillTags: this.props.skill_tags}
  },
   
  render: function() {
    console.log(this.state)
    return (
      <div className='skillTagBox'>
        <h2>AddedSkillTags</h2>
        <SkillAddButton />
        <AddedSkillTagList 
          addedSkillTags={this.state.addedSkillTags}
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
    return <li key={addedSkillTag.id}>{addedSkillTag.name}</li>;
  }
});

const SkillAddButton = React.createClass({
  render: function() {
    return (
      <form className='skillForm'>
        <input type='text' placeholder='your new skill' />
        <input type='submit' value='Add' />
      </form>
    )
  }
})
