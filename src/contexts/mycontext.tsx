import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }: any) => {
	const [isLogin, setIsLogin] = useState(false);

	return (
		<AppContext.Provider
			value={{
				isLogin,
				setIsLogin,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const myContext = () => {
	const { isLogin, setIsLogin } = useContext<any>(AppContext);

	return {
		isLogin,
		setIsLogin,
	};
};

export default myContext;
