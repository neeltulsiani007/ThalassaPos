<main className="max-w-screen-xl mx-auto px-6 my-16">
<div className='  items-center justify-center flex space-x-5   mb-10  '>
    <div
    className='flex  cursor-pointer bg-red-700  w-32 px-[24px] py-2 items-start text-lg justify-start   rounded-full  text-white'
    >
        Eatables
    </div>
    <div
      className='flex  cursor-pointer hover:bg-red-700  w-32 px-[35px] py-2 items-start text-lg justify-start bg-[#f91944]  rounded-full  text-white'
    >
        Drinks
    </div>
    <div
      className='flex  cursor-pointer hover:bg-red-700  w-32 px-[26px] py-2 items-start text-lg justify-start bg-[#f91944]  rounded-full  text-white'
    >
        Seafood
    </div>
    </div>


{foods?.length?
(
<div className='z-0 grid xl:grid-cols-3 md:grid-cols-2   space-y-4 grid-cols-1 gap-4 min-h-screen '>
{foods?.map((food) => (
<div class=" bg-gray-100 flex items-center">
<div class="container border-[1px] mx-4 p-9 bg-white max-w-md rounded-2xl  overflow-clip hover:shadow-2xl hover:scale-105 transform transition duration-500 ">
<h1 className='flex mb-4 py-1 w-24 px-[13px] items-start justify-start bg-red-100 border-[1px] rounded-full border-[#f91944] text-[#f91944] '>{food.CategoryName}</h1>
 <img class="rounded-xl w-full h-72" src={require(`../images/${food.image}`)} alt="" />
 <div class="flex justify-between items-center">
   <div>
     <h1 class="mt-5 text-2xl font-semibold">{food.ItemName}</h1>
     <p class="mt-2 font-bold">{food.Price+" INR"}</p>
   </div>
   <div>
     <button class="text-white text-md font-semibold bg-[#f91944] hover:bg-red-700 py-2 px-4 rounded-lg shadow-md hover:shadow-lg  ">Order Now</button>
   </div>
 </div>
</div>
</div>
))}
</div>
):<></>}

          
</main>




<main className="max-w-screen-xl mx-auto px-6 my-16">
<div className="flex flex-col justify-center items-center h-screen">
{food? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10" >

        {/* left side  */}
        <div className="order-2  md:order-1 lg:order-1 flex flex-col justify-center">
            <h1 className="text-center md:text-left lg:text-left text-3xl lg:text-4xl font-semibold poppins pb-4 text-gray-700 select-none">{food.CategoryName}</h1>
            <p className="text-center md:text-left lg:text-left text-sm poppins text-gray-500 leading-relaxed select-none">{food.CategoryName}</p>

            {/* price and quantity  */}
            <div className="flex items-center justify-center md:justify-start lg:justify-start space-x-6 pt-8">
                <h1 className="text-3xl font-bold text-black poppins select-none">${(food.price * quantity).toFixed(2)}</h1>
                {/* quantity  */}
                <div className="flex items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full">
                    <AiOutlineMinus onClick={() => {
                        quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1);
                    }}
                        className="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                    />
                    <span className="text-lg text-gray-700 poppins select-none">{quantity}</span>

                    <AiOutlinePlus onClick={() => {
                        setQuantity(quantity + 1);
                    }}
                        className="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                    />
                </div>
            </div>

            {/* add button  */}
            <div className="mt-8 flex items-center justify-center md:justify-start lg:justify-start">
                <button disabled={disabled} className={disabled ? "opacity-30 flex items-center space-x-3 bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105" : "flex items-center space-x-3 bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"} onClick={() => {
                    food['quantity'] = quantity;
                    food.price = food.price * quantity;
                    setDisabled(true);
                    console.log(food)
                }}>
                    <BsCart2 className="text-xl" />
                    <span>{disabled ? "Added" : "Add to Cart"}</span>
                </button>
            </div>

        </div>
        {/* right side  */}
        <div className="order-1 md:order-2 lg:order-2">
            <img src={require(`../images/${food.image}`)} className="w-3/4 md:w-3/4 lg:w-full mx-auto" alt="food" />
        </div>
    </div>
):<></>}
</div>
</main>