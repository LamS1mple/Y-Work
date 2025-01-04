import React, { useState } from "react";

export default function Test() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative w-full max-w-2xl mx-auto mt-5">
            {/* Search Bar */}
            <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
                <button
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-l-md"
                    onClick={toggleDropdown}
                >
                    Danh mục Nghề
                </button>
                <input
                    type="text"
                    className="flex-1 px-4 py-2 border-none outline-none"
                    placeholder="Vị trí tuyển dụng, tên công ty"
                />
                <button className="px-4 py-2 bg-green-500 text-white rounded-r-md">
                    Tìm kiếm
                </button>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <div className="flex p-4">
                        {/* Category List */}
                        <div className="w-1/3 border-r">
                            <ul className="space-y-2">
                                <li className="text-green-500 font-bold cursor-pointer">
                                    Kinh doanh/Bán hàng
                                </li>
                                <li className="cursor-pointer">Marketing/PR/Quảng cáo</li>
                                <li className="cursor-pointer">Chăm sóc khách hàng</li>
                                <li className="cursor-pointer">Nhân sự/Hành chính</li>
                                <li className="cursor-pointer">Tài chính/Ngân hàng</li>
                            </ul>
                        </div>

                        {/* Job Subcategories */}
                        <div className="w-2/3 pl-4">
                            <ul className="space-y-2">
                                <li className="cursor-pointer">Sales Xuất nhập khẩu/Logistics</li>
                                <li className="cursor-pointer">Sales Bất động sản/Xây dựng</li>
                                <li className="cursor-pointer">Sales Giáo dục/Khoa học</li>
                                <li className="cursor-pointer">Sales Admin/Sales Support</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
                        <button className="text-blue-500">Bỏ chọn tất cả</button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                            Chọn
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
