import {OPEN_LIBRARY_URL, OPEN_LIBRARY_COVERS_URL} from '../../constants/const.js'

export async function searchBooks(query, limit = 20) {
    try {
        const url = new URL(OPEN_LIBRARY_URL);

        url.searchParams.append('q', query);
        url.searchParams.append('limit', limit.toString());
        url.searchParams.append('fields', 'key,title,author_name,cover_i,first_publish_year,number_of_pages_median,subject');

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.docs || [];
    } catch (error) {
        console.error(`❌ Ошибка при поиске "${query}":`, error.message);
        return [];
    }
}

export function getCoverUrl(coverId) {
    return `${OPEN_LIBRARY_COVERS_URL}/${coverId}-L.jpg`;
}