import { useEffect, useState } from "react";
import { AuthContext } from "./Context";

const AuthContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setUser(null);
          setIsLogin(false);
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLogin(true);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
          {
            credentials: "include",
          },
        );

        if (res.status === 401) {
          setUser(null);
          setIsLogin(false);
          localStorage.removeItem("user");
          return;
        }

        const data = await res.json();

        if (data.success) {
          setUser(data.profile);
          setIsLogin(true);
          localStorage.setItem("user", JSON.stringify(data.profile));
        }
      } catch (error) {
        console.log(error);
        setUser(null);
        setIsLogin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchedProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        formData,
        setFormData,
        isLogin,
        setIsLogin,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
