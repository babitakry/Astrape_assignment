import Item from '../models/Item.js';

export const createItem = async (req, res) => {
    try {
        const { name, price, category, description } = req.body;
        const item = new Item({ 
            name: name,
            price: price, 
            category: category,
            description: description 
        });
        await item.save();
        res.json(item);
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            message: 'Server error' 
        });
    }
};

export const getItems = async (req, res) => {
    try {
        const { priceMin, priceMax, category } = req.query;
        let filter = {};

        if (priceMin || priceMax) {
            filter.price = {};
            if (priceMin) 
                filter.price.$gte = Number(priceMin);
            if (priceMax) 
                filter.price.$lte = Number(priceMax);
        }
        if (category) {
            filter.category = category;
        }

        const items = await Item.find(filter);
        res.json(items);
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            message: 'Server error' 
        });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category, description } = req.body;

        const item = await Item.findByIdAndUpdate(id, { 
            name: name,
            price: price,
            category: category,
            description: description 
        }, 
        { new: true });
        if (!item) 
            return res.status(404).json({ 
            message: 'Item not found' 
        });

        res.json(item);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByIdAndDelete(id);
        if (!item) 
            return res.status(404).json({ 
            message: 'Item not found'
        });

        res.json({ 
            message: 'Item deleted' 
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            message: 'Server error' 
        });
    }
};
