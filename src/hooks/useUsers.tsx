import { useState } from "react";
export const useUsers = () => {
	//   const { user, updateUser } = useContext<any>(AppContext);
	const [isUser, setIsUser] = useState();

	return { isUser, setIsUser };
};

// export { userReducer };
