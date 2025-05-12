const Loader = ({text}) => (
    <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-600 font-medium">{text}</p>
    </div>
);

export default Loader