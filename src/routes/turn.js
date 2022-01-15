const { Router } = require('express');
const router = Router();
const { Turn, Center } = require('../db')


router.get('/', async (req , res)=> {
  try{
  let turns = await Turn.findAll({
      include:[{
          model: Center, 
          attributes:['id' , 'name', 'address'],
          through:{
              attributes:[]
          }
      }]
  })
  res.json(turns)        
  }
  catch(error){
      res.send(error)
  }
})

router.get('/:id', async (req , res)=> {

  let id = req.params
  try{
  let turn = await Turn.findOne({
      where:{id:id},
      include:[{
          model: Center , attributes:['id' , 'name', 'address'],
          through:{
              attributes:[]
          }
      }]
  })
  res.json(turn)        
    }
    catch(error){
        res.send(error)
    }
})
 
router.post ('/', async (req, res, next) => { 
    try {
        const { name, description, date, centerID, userID } = req.body;
        const newTurn = await Turn.create({ 
        name,
        description, 
        date,
        })
        await newTurn.addCenter(centerID);
        await newTurn.addUser(userID);
        return res.status(201).send ('se creó el turno')
    } catch (error){
    next(error);
}
})


router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    Turn
      .update(body, {
        where: {
          id,
        },
      })
      .then(() => {
        res.send('se modificó satisfactoriamente');
      })
      .catch((error) => next(error));
  });








module.exports = router;