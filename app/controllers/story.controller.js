const Story = require('../models/story.model');


const readStories = async (req, res) => {
    const result = await Story.find();
    /* console.log(result); */
   return res.status(200).json({
    ok: true,
    res:result
   })
 

}


module.exports = readStories;