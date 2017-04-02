const AddedSkillTagList = require('./AddedSkillTagList')

const SkillTagBox = React.createClass({
  render: function() {
    return (
      <div className='skillTagBox'>
        <AddedSkillTagList />
      </div>
    );
  }
});
