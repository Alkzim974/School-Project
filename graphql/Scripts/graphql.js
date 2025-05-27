export async function fetchGraphQL(query, token) {
    try {
        const response = await fetch(`https://zone01normandie.org/api/graphql-engine/v1/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: query,
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Network response error: ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error('GraphQL fetch error:', error);
        throw error;
    }
};