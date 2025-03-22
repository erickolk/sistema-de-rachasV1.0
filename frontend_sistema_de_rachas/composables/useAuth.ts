import { ref } from "vue";
import { useRouter } from "#app";

const isAuthenticated = ref<boolean>(false);
const userType = ref<string | null>(null);
const userName = ref<string | null>(null);

export default function useAuth() {
  const router = useRouter();

  const setAuth = (payload: {
    isAuthenticated: boolean;
    userType: string;
    userName: string;
  }) => {
    console.log(`[DEBUG] Setando autenticação: ${JSON.stringify(payload)}`);
    isAuthenticated.value = payload.isAuthenticated;
    userType.value = payload.userType.toLowerCase();
    userName.value = payload.userName;

    localStorage.setItem("isAuthenticated", String(payload.isAuthenticated));
    localStorage.setItem("userType", payload.userType.toLowerCase());
    localStorage.setItem("userName", payload.userName);
  };

  const logout = () => {
    console.log("[DEBUG] Realizando logout");
    isAuthenticated.value = false;
    userType.value = null;
    userName.value = "";

    localStorage.removeItem("userToken");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");

    router.push("/auth/login");
  };

  const loadAuthState = () => {
    const token = localStorage.getItem("userToken");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    const storedUserType = localStorage.getItem("userType");
    const storedUserName = localStorage.getItem("userName");

    isAuthenticated.value = !!token && storedIsAuthenticated === "true";
    userType.value = isAuthenticated.value ? storedUserType || null : null;
    userName.value = isAuthenticated.value ? storedUserName || null : null;

    console.log(
      `[DEBUG] Estado inicial: isAuthenticated=${isAuthenticated.value}, userType=${userType.value}, userName=${userName.value}`
    );
  };

  return {
    isAuthenticated,
    userType,
    userName,
    setAuth,
    logout,
    loadAuthState,
  };
}
