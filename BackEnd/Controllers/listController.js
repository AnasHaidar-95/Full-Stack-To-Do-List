import Lists from "../Models/listModel.js";

export const addNewItem = async (req, res) => {
  try {
    const newItem = new Lists(req.body);
    await newItem.save();
    res.status(201).send("Added");
  } catch (error) {
    res.status(400).send(`Error Adding Data ... ${error}`);
  }
};

export const showAllItems = async (req, res) => {
  const showItems = await Lists.find();

  res.status(201).send(showItems);
};

export const editItem = async (req, res) => {
  try {
    const updateItem = await Lists.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          content: req.body.content,
          finished: req.body.finished,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(201).json(updateItem);
  } catch (error) {
    res.status(400).send(`Error Editing Data ${error}`);
  }
};

export const findItem = async (req, res) => {
  try {
    const foundItem = await Lists.findById(req.params.id);
    res.status(201).json(foundItem);
    console.log(foundItem);
  } catch (error) {
    res.status(400).send(`Error finding Data ${error}`);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const updateItem = await Lists.findByIdAndDelete(req.params.id);
    return res.status(201).json(updateItem);
  } catch (error) {
    res.status(201).send("Deleted");
  }
};
