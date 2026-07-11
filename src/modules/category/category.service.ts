import prisma from "../../lib/prisma"

const createCategory = async (payload: { name: string }) => {
    const { name } = payload

    validateCategoryInput(payload)

    if (!name) {
        throw new Error("Name is required")
    }

    console.log(payload);
    const category = await prisma.category.findUnique({
        where: { name }
    });
    if (category) {
        throw new Error("This category already exsist ")
    }

    const resutl = await prisma.category.create({
        data: { name }
    });
    return resutl;
};
const validateCategoryInput = (data: any) => {
    if (!data.name || data.name.trim() === "") {
        throw new Error("Category name is required");
    }
};







const getAllCategory = async () => {

    const categories = await prisma.category.findMany()

    return categories;
}



export const categoryService = {
    createCategory,
    getAllCategory
}