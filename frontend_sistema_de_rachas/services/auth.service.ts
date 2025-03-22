import type {
  CreateUserDto,
  LoginDto,
} from 'sistema-rachas-domain/dto/user.dto';
import { ref } from 'vue';
import { useNuxtApp } from 'nuxt/app';

const userType = ref<number | null>(null);

export const registerUser = async (user: CreateUserDto) => {
  const { $api } = useNuxtApp();

  const response = await $api.post('/auth/register', {
    name: user.name,
    email: user.email,
    password: user.password,
    photoUrl: user.photoUrl,
    role: user.role,
  });
  return response;
};

export const login = async (user: LoginDto) => {
  const { $api } = useNuxtApp();
  try {
    const response = await $api.post('/auth/login', {
      email: user.email,
      password: user.password,
    });
    const { token, userType, userName } = response.data;
    console.log('[DEBUG] Response Data:', response.data);

    localStorage.setItem('userToken', token);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userName', userName);

    console.log('[DEBUG] User info:', response.data);

    return { token, userType, userName };
  } catch (error: any) {
    console.error('[ERROR] Erro no login:', error.response || error);
    throw new Error('Erro durante o login. Verifique suas credenciais.');
  }
};

export const getUserProfile = async () => {
  const { $api } = useNuxtApp();
  try {
    const token = localStorage.getItem('userToken');
    const response = await $api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Auth me', response);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o perfil do usuário', error);
    throw new Error('Erro ao buscar o perfil do usuário.');
  }
};

export const updateUserProfile = async (updatedUser: {
  name: string;
  email: string;
  role?: string;
}) => {
  const { $api } = useNuxtApp();
  try {
    const userData = {
      name: updatedUser.name?.trim() || undefined,
      email: updatedUser.email?.trim() || undefined,
    };
    
    console.log('Enviando dados para atualização:', userData);
    
    const token = localStorage.getItem('userToken');
    const response = await $api.put('/auth/update', userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao atualizar o perfil', error);
    
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Erro ao atualizar o perfil.');
  }
};

export const getUserRole = () => userType.value;
