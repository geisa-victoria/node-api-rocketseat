const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
    // Listagem de produtos
    async index(req, res) {
        const { page = 1 } = req.query;
        const products = await Product.paginate({}, { page, limit: 10});

        return res.json(products);
    },
    // Mostra um produto só
    async show(req, res) {
        const product = await Product.findById(req.params.id);
        
        return res.json(product);
    },
    // Criação de um produto
    async store(req, res) {
        const product = await Product.create(req.body);

        return res.json(product);
    },
    
    // atualiza um único produto pelo id da rota e substitui pelo valor fornecido dentro do req.body, o terceiro parâmetro
    // faz com que o que retorna pra product seja o conteúdo já atualizado com os dados enviados pelo req.body
    async update(req, res) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(product);
    },
    // remover um produto pelo id e retornar uma mensagem de sucesso
    async destroy(req, res) {
        await Product.findByIdAndRemove(req.params.id);
        
        return res.send('Sucesso!');
    }
}