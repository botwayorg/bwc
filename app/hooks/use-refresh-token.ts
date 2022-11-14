import axios from "../client";
import useAuth from "./use-auth";

const useRefreshToken = () => {
  const { setAuth }: any = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);

      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
