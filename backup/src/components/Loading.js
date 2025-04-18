import { jsx as _jsx } from "react/jsx-runtime";
const Loading = () => {
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" }) }));
};
export default Loading;
