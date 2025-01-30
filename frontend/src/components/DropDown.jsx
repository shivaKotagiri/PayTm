import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

function DropDown({ name }) {
    const navigate = useNavigate();
    function handleSignOut(){
      localStorage.removeItem("token");
      navigate('/signin');
    }

    function handleSettings() {
      navigate("/settings");
    }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="cursor-pointer bg-[#f5f5f5] hover:bg-[#e9e9e9]  rounded-full text-black w-[30px] h-[30px] text-sm font-[500] justify-center text-center ml-3">
          {name[0].toUpperCase()}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              type="submit"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              onClick={handleSettings}
            >
              Account Settings
            </button>
          </MenuItem>
          <form>
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}

export default DropDown;

