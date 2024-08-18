import { Request, Response } from "express";
import { prisma } from "..";

const createRoom = async (req: Request, res: Response) => {
  const { name } = req.body;
  const room = await prisma.room.create({
    data: {
      name,
    },
  });
  res.json(room);
};

const getRooms = async (req: Request, res: Response) => {
  const rooms = await prisma.room.findMany();
  res.json(rooms);
};

const getRoom = async (req: Request, res: Response) => {
  const { id, name } = req.params;
  const room = await prisma.room.findFirst({
    where:{
      id: id
    }
  })
  res.json(room);
};

const getRoomByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  const room = await prisma.room.findFirst({
    where:{
      name: name
    }
  })
  res.json(room);
}

const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const room = await prisma.room.delete({
    where: {
      id: id,
    },
  });
  res.json(room);
};

const updateRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const room = await prisma.room.update({
    where: {
      id: id,
    },
    data: {
      name,
    },
  });
  res.json(room);
};

export default { createRoom, getRooms, getRoom, deleteRoom, updateRoom, getRoomByName };