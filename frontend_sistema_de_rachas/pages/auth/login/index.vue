<template>
  <div class="form-container-mobile">
    <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="space-y-2 mb-8">
        <div>
          <label class="block mb-2" for="email">Email:</label>
          <InputText
            id="email"
            type="email"
            v-model="email"
            class="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label class="block mb-2" for="password">Senha:</label>
          <Password
            id="password"
            v-model="password"
            fluid
            required
            toggleMask
            :feedback="false"
          />
        </div>
      </div>
      <Button label="Entrar" type="submit" class="w-full" />
    </form>
    <p class="mt-4">
      Não tem uma conta?
      <RouterLink to="/auth/register" class="text-blue-600"
        >Registrar</RouterLink
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"; 
import { useRouter } from "nuxt/app";
import useAuth from "../../../composables/useAuth";
import { getUserProfile, login } from "../../../services/auth.service";

const email = ref("");
const password = ref("");
const router = useRouter();
const { setAuth, loadAuthState } = useAuth();

onMounted(() => {
  loadAuthState();
});

const handleLogin = async () => {
  try {
    const user = { email: email.value, password: password.value };
    const { token } = await login(user);
    const userProfile = await getUserProfile();
    const userType = userProfile.role === 1 ? "owner" : "client";
    const userName = userProfile.name;

    console.log("[DEBUG] User Type:", userType);
    setAuth({ isAuthenticated: true, userType, userName });

    if (userType === "client") {
      await router.push("/dashboard-client");
    } else if (userType === "owner") {
      await router.push("/dashboard");
    } else {
      throw new Error("Tipo de usuário inválido");
    }
  } catch (error) {
    console.error("[ERROR] Login failed:", error);
    alert("Erro de autenticação. Verifique suas credenciais.");
  }
};
</script>
