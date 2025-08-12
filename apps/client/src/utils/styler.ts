export const getProfileButtonStyle = (mark = false) => {
    return `border-b-white rounded-md text-white w-full text-center flex items-center justify-center h-10 hover:ring-2 focus:ring-2 ring-blue-700 transition-ring duration-200 ${mark ? "bg-red-600" : "bg-black"}`;
}