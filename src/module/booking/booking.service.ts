import { Booking, ReviewAndRating, Services } from "@prisma/client";
import prisma from "../../shared/prisma";
export const addBookingToDB = async (
  data: Booking
): Promise<Booking | null> => {
  try {
    const { userId, servicesId, status } = data;

    // Check if the service with the specified servicesId exists
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
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
};

export const getBookingByUseridFromDB = async (id: string) => {
  const result = await prisma.booking.findMany({
    where: {
      userId: id,
    },
    include: {
      service: true,
      user: true,
    },
  });
  return result;
};
export const getAllBookingsFromDB = async () => {
  const result = await prisma.booking.findMany({
    include: {
      service: true,
      user: true,
    },
  });
  return result;
};

export const updateBookingFromDB = async (id: string, payload: any) => {
  console.log(id, "id");
  console.log(payload, "payload");
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

export const deleteBookingFromDB = async (id: string) => {
  console.log(id);
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};
