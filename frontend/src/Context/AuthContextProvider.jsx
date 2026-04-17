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
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
          {
            credentials: "include",
          },
        );

        const { profile, success } = await res.json();

        if (success) {
          setUser(profile);
          setIsLogin(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
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
