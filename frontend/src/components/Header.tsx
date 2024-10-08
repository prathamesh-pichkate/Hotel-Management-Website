import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">BookHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center text-white px-3 font-bold hover:bg-blue-400"
              >
                {" "}
                My Bookings{" "}
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center text-white px-3 font-bold hover:bg-blue-400"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white text-blue-500 px-3 font-bold hover:bg-gray-200"
            >
              Signin
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
