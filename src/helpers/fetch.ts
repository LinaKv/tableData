const dateFrom = '2019-06-20T23:59:59';
const apiBaseUrl = process.env.REACT_APP_URL;
const token = process.env.REACT_APP_TOKEN;

const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
};

export async function getFetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${apiBaseUrl}${endpoint}?dateFrom=${encodeURIComponent(dateFrom)}`, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
