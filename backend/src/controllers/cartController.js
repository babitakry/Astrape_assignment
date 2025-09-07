import User from '../models/User.js';
import Item from '../models/Item.js';

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.item');
        res.json(user.cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        
        const user = await User.findById(req.user.id);
        const item = await Item.findById(itemId);

        if (!item) 
            return res.status(404).json({ 
            message: 'Item not found' 
        });

        const cartItem = user.cart.find(c => c.item.toString() === itemId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            user.cart.push({ item: itemId, quantity });
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Server error' 
        });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;

        const user = await User.findById(req.user.id);

        user.cart = user.cart.filter(c => c.item.toString() !== itemId);

        await user.save();
        res.json(user.cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Server error' 
        });
    }
};
