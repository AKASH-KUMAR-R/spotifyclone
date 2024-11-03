import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const PageNotFound = () => {

    const history = useHistory();

    const handlePageNotFound = () => {
        history.push('/');
    }

    return (
        <div className=" flex justify-center items-center w-full h-full">
            <div className=" w-10/12 lg:w-4/12  bg-[#5CF64A] rounded-md p-6 text-black" >
                <h1 className=" text-xl font-semibold mb-4">Oops! Page Not Found</h1>
                <p className=" mb-2">
                We couldn't find the page you're looking for. It may have been moved or doesn't exist.
                </p>

                <button className=" w-40 h-8 bg-slate-900 rounded-md text-white" onClick={handlePageNotFound}>Visit our homepage</button>
            </div>
        </div>
    );
};

export default PageNotFound;

