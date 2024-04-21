import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectRouter = (props) => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    navigate("/register");
  }
  return <Route {...props} />;
};

export default ProtectRouter;
