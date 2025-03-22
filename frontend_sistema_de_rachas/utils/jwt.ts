import { jwtDecode } from "jwt-decode";

interface DecodedToken {
id?: string;
}

export const getUserId = (): string | null => {
    try {
        const token = localStorage.getItem('userToken'); 
        if (!token) {
            return null;
        }
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.id || null;
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
    }
};