const router = require('express').Router();
const {Tag, Product, ProductTag} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const tagData = await Tag.findAll({
            attributes: [
                'id', 'tag_name'
            ],
            include: [
                {
                    model: Product,
                    attributes: [
                        'id',
                        'product_name',
                        'price',
                        'stock',
                        'category_id'
                    ]
                }
            ]
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
        const tagData = await Tag.findOne({
            attributes: ['id'],
            include: [
                {
                    model: Product,
                    attributes: [
                        'id',
                        'product_name',
                        'price',
                        'stock',
                        'category_id'
                    ]
                }
            ]
        });
        res.status(200).json(tagData);

    } catch (err) {
        res.status(500).json(err);
    }

});

router.post('/', async (req, res) => { // create a new tag
    try {
        const tagData = await Tag.create({tag_name: req.params.tag_name});
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => { // update a tag's name by its `id` value
    try {
        const tagData = await Tag.update({id: req.params.id});
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => { // delete on tag by its `id` value
    try {
        const tagData = Tag.destroy({id: req.params.id});
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
