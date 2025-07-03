import express from "express";
import {
  addNewItem,
  deleteItem,
  editItem,
  findItem,
  showAllItems,
} from "../Controllers/listController.js";

const listRoutes = express.Router();

listRoutes.post("/addNewList", addNewItem);
listRoutes.get("/showAllItems", showAllItems);
listRoutes.patch("/editList/id/:id", editItem);
listRoutes.get('/findItem/id/:id',findItem);
listRoutes.delete('/deleteItem/id/:id',deleteItem);

export default listRoutes;
