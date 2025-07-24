"use client"
export default function Footer() {
    return (
        <footer className="bg-[#ffffff] border-t border-[#dddddd]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#f0bd1b] rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-[#ffffff] rounded-full"></div>
                        </div>
                        <span className="text-[#333333] font-semibold">Bright Horizons</span>
                    </div>

                <div className="flex flex-wrap justify-center space-x-6 text-sm text-[#707070]">
                    <a href="#" className="transition-colors duration-200 ease-out hover:text-[#333333]">
                        Home
                    </a>
                    <a href="#" className="transition-colors duration-200 ease-out hover:text-[#333333]">
                        Contact Us
                    </a>
                    <a href="#" className="transition-colors duration-200 ease-out hover:text-[#333333]">
                        Cookie Notice
                    </a>
                    <a href="#" className="transition-colors duration-200 ease-out hover:text-[#333333]">
                        Accessible Use Policy
                    </a>
                    <a href="#" className="transition-colors duration-200 ease-out hover:text-[#333333]">
                        Privacy Notice
                    </a>
                    <a href="#" className="transition-colors duration-200 ease-out hover:text-[#333333]">
                        Trademark Policy
                    </a>
                </div>

                <div className="text-xs text-[#707070] text-center">
                    © 2023 Bright Horizons Family Solutions. All Rights Reserved.
                </div>
                </div>
            </div>
        </footer>
    )
}