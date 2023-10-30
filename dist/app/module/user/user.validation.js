"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidation = void 0;
const zod_1 = require("zod");
const update = zod_1.z.object({
    body: zod_1.z.object({
        studentId: zod_1.z.string().optional(),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
        academicSemesterId: zod_1.z.string().optional(),
        academicDepartmentId: zod_1.z.string().optional(),
        academicFacultyId: zod_1.z.string().optional()
    })
});
exports.StudentValidation = {
    update
};
