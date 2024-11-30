import { Category } from "../models/Category.mjs";


export default class CategoryController{
    static async create(req,res){
        try {
            const {name} = req.body;
            
            const category = new Category({
                name: name,
            });

            await category.save()
            return res.status(200).json({created_category: category});
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;

            await Category.findOneAndDelete({_id: id});
            return res.status(200).json({msg: 'Категория удалена'});
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    }
}