import {Blocks} from "react-loader-spinner";

const Loader = ({text}) => {
    return (
        <div className="flex justify-center items-center w-full h-[450px">
            <div className="flex flex-col items-center gap-1">
                <Blocks
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    visible={true}
                />
                <p className="text-slate-800">
                    {text? text : "Please wait..." }
                </p>
            </div>
        </div>

    )
}

export default Loader;