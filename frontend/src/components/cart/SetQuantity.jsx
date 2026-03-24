
const btnStyles ="border-[1.2px] rounded-lg border-slate-800 px-3 py-1" ;

const SetQuantity = ({
                         quantity,
                         cardCounter,
                         handleQtyIncrease,
                         handleQtyDecrease,
                     }) => {
    return (
        <div className="flex gap-8 items-center">
            {cardCounter? null : <div className="font-semibold">Quantity</div>}
            <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
                {/* - Button*/}
                <button
                    disabled={quantity<=1}
                    className={btnStyles}
                >
                    -
                </button>
                    <div className="text-red-500">{quantity}</div>
                {/* + Button*/}
                <button
                    disabled={quantity<=1}
                    className={btnStyles}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default SetQuantity;