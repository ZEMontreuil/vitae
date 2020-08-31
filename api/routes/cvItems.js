var express = require('express');
var router = express.Router();
const sql = require('../db');
const { response, query } = require('express');

const { PrismaClient, prismaVersion } = require("@prisma/client");

const prisma = new PrismaClient();

//PRISMA GET
router.get('/', async (req, res, next) => {
  const allItems = await prisma.cVItems.findMany();

  res.status = 200;
  res.json(allItems);
});

// PRISMA DELETE
router.delete('/itemId/:itemId/', async (req, res, next) => {
  const {itemId} = req.params;
  const item = await prisma.cVItems.delete({
    where: {
      Id: parseInt(itemId),
    }
  });

  res.sendStatus(200);
});

// PRISMA PATCH
router.patch('/itemId/:itemId/', async (req, res, next) => {
  const {itemId} = req.params;
  const {Title, Description} = req.body;

  const item = await prisma.cVItems.update({
    where: { Id: parseInt(itemId)},
    data: {
      Title,
      Description,
    },
  });

  res.status(200);
  res.json(item);
});


// PRISMA POST
router.post('/', async (req, res, next) => {
  const {Title, Description } = req.body;

  await prisma.cVItems.create({
    data: {
      Title,
      Description,
    }
  });

  res.sendStatus(200);
});

module.exports = router;
