
const CompanyDesc = ({ companyDescription, loading, logoimg }) => {
  return (
    <div className='mt-4 mb-4 pb-1 pl-4 bg-gradient-to-r from-white/5 via-white/20 to-white/5 backdrop-blur-lg shadow-lg rounded-xl'>
      <div className="flex justify-between items-center relative z-20">
        <h1 className='text-[#e6e7ec] text-[19px] leading-[34px] pt-[17px] font-bold px-7 p-1'>
          About Company
        </h1>
      </div>

      <div className="relative overflow-hidden min-h-[120px]">
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            loading ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="loading loading01">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
        </div>

        <div
          className={`relative transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {logoimg && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <img
                src={logoimg}
                alt="Watermark Logo"
                className="w-44 opacity-10 select-none"
              />
            </div>
          )}
          <p className='relative z-10 text-[#e6e7ec] px-7 p-4 text-justify'>
            {companyDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDesc;