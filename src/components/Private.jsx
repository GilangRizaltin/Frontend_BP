import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function Private() {
  const user = useSelector(state => state.user.userInfo.user_type);
  if (user === "Head Office" || user === "Admin" ) return <Navigate to="/dashboard" replace={true} />;
  if (user === "Student" ) return <Navigate to="/profile" replace={true} />;
}

export default Private;  