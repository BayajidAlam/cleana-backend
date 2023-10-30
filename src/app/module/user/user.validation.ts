import { z } from "zod";

const update = z.object({
  body: z.object({
      studentId: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
      profileImage: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      gender: z.string().optional(),
      bloodGroup: z.string().optional(),
      academicSemesterId: z.string().optional(),
      academicDepartmentId: z.string().optional(),
      academicFacultyId: z.string().optional()
  })
});



export const StudentValidation = {
  update
};