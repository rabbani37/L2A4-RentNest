export const validateCategoryInput = (data: any) => {
    if (!data.name || data.name.trim() === "") {
        throw new Error("Category name is required");
    }
};
