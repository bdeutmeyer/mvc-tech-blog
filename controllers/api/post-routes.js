const router = require('express').Router();
const { Post, Comment } = require('../../models');

// Route to get one post - /api/post/:id
router.get('/:id', async (req, res) => {
    try{ 
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: Comment }],
        });
        if(!postData) {
            res.status(404).json({message: 'There is no post with this id.'});
            return;
        }
        res.status(200).json(postData)
        // const post = postData.get({ plain: true });
        // res.render('post', post);
    } catch (err) {
        res.status(500).json(err);
    };     
});

// Route to create a new post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create(req.body);
    res.status(200).json(postData);
    //Wrap below in a thing to take page to new id route
    // const post = postData.get({ plain: true });
    // res.render('post', post)
  } catch (err) {
    res.status(400).json(err);
  }
});



// // According to MVC, what is the role of this action method?
// // This action method is the Controller. It accepts input and sends data to the Model and the View.
// router.put('/:id', async (req, res) => {
//   // Where is this action method sending the data from the body of the fetch request? Why?
//   // It is sending the data to the Model so that one dish can be updated with new data in the database.
//   try {
//     const dish = await Dish.update(
//       {
//         dish_name: req.body.dish_name,
//         description: req.body.description,
//         guest_name: req.body.guest_name,
//         has_nuts: req.body.has_nuts,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     // If the database is updated successfully, what happens to the updated data below?
//     // The updated data (dish) is then sent back to handler that dispatched the fetch request.
//     res.status(200).json(dish);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
