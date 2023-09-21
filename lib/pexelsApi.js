const axios = require('axios');
// lib/pexelsApi.js

const baseUrl = 'https://api.pexels.com/v1';
const apiKey = "bkrsFQvPRCZMgcjcuMmLh3qRc539lQYDJXhs3xTKPmFTNfRkthAwdxe9"

export const fetchCuratedPhotos = async (perPage = 15) => {
    const endpoint = `${baseUrl}/curated?per_page=${perPage}`;

    const response = await fetch(endpoint, {
        headers: {
            Authorization: apiKey,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch curated photos');
    }

    const data = await response.json();
    return data.photos;
};

// Function to fetch a specific photo by ID
export async function fetchPhotoById(id) {
    try {
        // Define the endpoint for fetching a specific photo
        const endpoint = `/photos/${id}`;

        // Make the API request using the shared function
        const data = await makeApiRequest(endpoint);
        return data;
    } catch (error) {
        throw new Error(`Error fetching photo by ID: ${error.message}`);
    }
}


export async function searchPhotos(query, page = 1, perPage = 15) {
    try {
        const response = await axios.get(`${baseUrl}/search`, {
            params: {
                query,
                per_page: perPage,
            },
            headers: {
                Authorization: apiKey,
            },
        });

        if (response.status !== 200) {
            console.log(`Failed to fetch photos: ${response.statusText}`);
        }

        return response.data.photos;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
}
