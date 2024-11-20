import { Product } from "../models/Product.mjs";


export default class ProductController{
    static async create(req,res){
        try {
            const {name,price,description} = req.body;
            if (!name || price <= 0 || !description || !req.file) {return res.status(404).json({msg: 'Необходимые данные отсутствуют!'})}
            
            const product = new Product({
                name: name,
                price: price,
                description: description,
                picture: req.file.filename
            });

            await product.save()
            return res.status(200).json({created_product: product});
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    }

    static async load(req, res) {
        try {
            const alldata = await Product.find()
            res.json(alldata)
        } catch (error) {
            return {error}
        }
    }

    static async loadpic(req, res) {
        try {
            const { filename } = req.params;
            res.sendFile(`media/${filename}`, { root: '.' });
        } catch (error) {
            return {error}
        }
    }
}