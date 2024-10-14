import axios, { AxiosInstance } from 'axios';

class ApiService {
    private adminAccessToken: string | null = null;
    private readonly axiosInstance: AxiosInstance;
    private readonly apiUrl: string = `${process.env.BASE_URL}api`;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl,
        });
    }

    private async createAdminAccessToken() {
        const url = '/auth/jwt/create/';
        const credentials = {
            email: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
        };

        try {
            const response = await this.axiosInstance.post(url, credentials);
            this.adminAccessToken = response.data.access;
        } catch (error) {
            console.error('Error creating admin access token:', error);
            throw error;
        }
    }

    private async authenticate() {
        if (!this.adminAccessToken) {
            await this.createAdminAccessToken();
        }
    }

    public async getListOfBackcalles() {
        await this.authenticate();

        try {
            const response = await this.axiosInstance.get('/backcall/', {
                headers: {
                    Authorization: `Bearer ${this.adminAccessToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching backcall list:', error);
            throw error;
        }
    }

    public async deleteBackcalle(id: number) {
        await this.authenticate();

        try {
            const response = await this.axiosInstance.delete(`/backcall/${id}/`, {
                headers: {
                    Authorization: `Bearer ${this.adminAccessToken}`
                }
            });
            return { status: response.status, data: response.data };
        } catch (error) {
            console.error(`Error deleting backcall with id ${id}:`, error);
            throw error;
        }
    }
}

export default new ApiService();