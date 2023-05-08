import { useState } from 'react';

const useGoogleReviews = (placeId: string) => {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<any[]>([]);

    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&placeid=${placeId}`;
    fetch(url).then((response) => {}).then((data) => {
        console.log('DATA')
    });
    const fetchReviews = async () => {
        const response = await fetch(url);
        const data = await response.json();
        console.log('data', data.result.reviews);
        setReviews(data.result.reviews);
        setLoading(false);
    };

    fetchReviews();
    return [loading, reviews];
}

export default useGoogleReviews;
