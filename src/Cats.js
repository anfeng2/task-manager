import { useState } from 'react';

const Cats = () => {
    const [catPic, setCatPic] = useState(null);

    const fetchCatPic = async () => {
        const apiKey = process.env.CATS_API_KEY;
        const url = `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`;  
        try {
            const response = await fetch(url);
            const data = await response.json();
            setCatPic(data[0].url); 
        } catch (error) {
            console.error('Error fetching pet picture:', error);
        }
    };

    return { catPic, fetchCatPic };
};

export default Cats;
