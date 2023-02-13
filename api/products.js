const fs = require('fs');

class ProductManager{

    constructor(filename){ 
        this.path = filename;
    };

    async getAll(){
        try{
            if(fs.existsSync(this.path, 'utf8')){
                let products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            }else{
                return [];
            }

        }catch(error){
            console.log(error);
        }
    };

    async save(data){
        try{
            let products = await this.getAll();
            let codeValues = products.find(product => product['code'] === data.code);
            if(!codeValues){
                if (products.length === 0) {
                    data['id'] = 1;
                }else{
                    data['id'] = products[products.length - 1]['id'] + 1;  
                }
                products.push(data);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return data.id;
            }else{
                console.log('The code entered already exists');
                return null;
            }
        
        }catch(error){
            console.log(error);
        }
    };

    async getById(id){
        try{
            let products = await this.getAll();
            let myProduct = products.find((product) => product.id == id);
            if(myProduct != null){
                return myProduct;
            }else{
                console.log('no matches found');
            }
        }catch(error){
            console.log(error);
        }
    };

    async updateProduct(data){
        try{
            let products = await this.getAll();
            let myProduct = products.find((product) => product['id'] == data.id);
            if(myProduct!= null){
                myProduct.title = data.title;
                myProduct.description = data.description;
                myProduct.price = data.price;
                myProduct.thumbnail = data.thumbnail;
                myProduct.code = data.code;
                myProduct.stock = data.stock;
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        } catch(error){
            console.log(error);
        }
    };

    async deleteById(id){
        try{
            let products = await this.getAll();
            let myProduct = products.find(product => product['id'] === id);
            if(myProduct!= null){
                products.splice(products.indexOf(myProduct), 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        }catch(error){
            console.log(error);
        }
    };
};

let container = new ProductManager('./products.json') 

const getProducts = async (req, res) => {
    try{
        let limit = req.query.limit;
        if(limit != null || limit > 0) {
            const products = await container.getAll();
            const productsLimit = products.slice(0, limit);
            res.json(productsLimit);
        }else{
            const products = await container.getAll();
            res.json(products);
        }
    }catch(err){
        console.log(err);
    }
};

const getProductId = (req,res) => {
    const { pid } = req.params;
    container.getById(parseInt(pid)).then(product => res.json(product));
};

const saveProduct = (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if( !title || !description || !code || !price || !status || !stock || !category ){
        return res.status(400).json({ succes: false, error: 'Missing data' });
    }
    const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    };
    container.save(newProduct).then(id => {
        if(id!=null){
            container.getById(id).then(product => res.json(product))
        }else{
            return res.json({ succes: false, error: 'The product already exists' });
        }
    });
};

const updateProduct = (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body; 
    const newProduct = {
        id: pid,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    };
    container.updateProduct(newProduct).then(() => container.getById(pid).then((prod) => res.json(prod)));
}

const deleteProduct = (req, res) => {
    const { pid } = req.params;
    container.deleteById(parseInt(pid)).then(() => container.getAll().then(products => res.json(products)))
}

module.exports = { getProducts, saveProduct, updateProduct, deleteProduct, getProductId };