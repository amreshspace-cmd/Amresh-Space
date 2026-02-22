// Space Data API Service
class SpaceAPIService {
    constructor() {
        this.baseURL = 'https://api.le-systeme-solaire.net/rest/bodies/';
        this.localData = null;
    }

    async fetchSpaceData() {
        try {
            // Try to fetch from API first
            const response = await fetch(this.baseURL);
            if (!response.ok) throw new Error('API failed');
            const data = await response.json();
            return this.processAPIData(data);
        } catch (error) {
            console.log('Falling back to local data:', error);
            // Fallback to local JSON
            return this.fetchLocalData();
        }
    }

    async fetchLocalData() {
        try {
            const response = await fetch('../data/space-data.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error loading local data:', error);
            return this.getMockData();
        }
    }

    processAPIData(data) {
        // Transform API data to our format
        return data.bodies.map(body => ({
            id: body.id,
            name: body.englishName || body.name,
            category: body.bodyType,
            distance: body.semimajorAxis,
            description: ${body.englishName || body.name} is a ${body.bodyType.toLowerCase()} in our solar system.,
            discoveryDate: body.discoveryDate || 'Ancient',
            mass: body.mass?.massValue || 'Unknown'
        }));
    }

    getMockData() {
        return [
            {
                id: 1,
                name: 'Mars',
                category: 'Planet',
                distance: 227.9,
                description: 'The Red Planet, fourth from the Sun',
                discoveryDate: 'Ancient',
                mass: 0.107
            },
            {
                id: 2,
                name: 'Andromeda Galaxy',
                category: 'Galaxy',
                distance: 2.537,
                description: 'Nearest major galaxy to the Milky Way',
                discoveryDate: '964',
                mass: 'Unknown'
            },
            {
                id: 3,
                name: 'Artemis Mission',
                category: 'Mission',
                distance: 384400,
                description: 'NASA mission to return humans to the Moon',
                discoveryDate: '2024',
                mass: 'N/A'
            }
        ];
    }
}

export default SpaceAPIService;
