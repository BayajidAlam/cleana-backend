import { Booking, ReviewAndRating, Services } from "@prisma/client";
import prisma from "../../shared/prisma";

const addBooking = async (
  data: Booking
): Promise<Booking | null> => {
  try {
    const { userId, servicesId, status } = data;

    const service = await prisma.services.findUnique({
      where: { id: servicesId },
    });

    if (!service) {
      throw new Error("Service Not Found");
      return null;
    }

    const result = await prisma.booking.create({
      data,
      include: {
        service: true,
        user: true,
      },
    });

    return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
};

const getBookingByUserId = async (id: string) => {
  
  const result = await prisma.booking.findMany({
    where: {
      userId: id,
    },
    include: {
      service: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};
const getAllBooking = async () => {

  const result = await prisma.booking.findMany({
    include: {
      service: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const updateBooking = async (id: string, payload: any) => {

  const result = await prisma.booking.update({
    where: {
      id,
    },
    // @ts-ignore
    data: payload,
    include: {
      service: true,
      user: true,
    },
  });
  return result;
};

const deleteBooking = async (id: string) => {

  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookingService = {
  addBooking,
  getBookingByUserId,
  getAllBooking,
  updateBooking,
  deleteBooking,
};
