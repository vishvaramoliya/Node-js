import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Aside from './Aside';
import Header from '../Header';

export default function AddManager() {
    const token = sessionStorage.getItem("token");

    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/", { replace: true });
        }
    }, [])


    const handleAddManager = async ()=>{
        
    }

    return (
        <div className="flex h-screen overflow-hidden">

            <div>
                <Aside />
            </div>


            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex justify-center overflow-y-auto p-6 bg-gray-50">


                    <form action="" className='w-[50%] border p-[30px] h-auto rounded-[5px]'>
                        <h1 className="text-2xl font-bold mb-6">Add Manager</h1>

                        <input type="text" placeholder="Enter Manager name" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input type="text" placeholder="Enter Contact No." className="w-full p-2 mt-[15px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input type="text" placeholder="Enter Email" className="w-full p-2 mt-[15px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input type="text" placeholder="Enter Password" className="w-full p-2 mt-[15px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                        <center>
                            <button onClick={handleAddManager} className='px-3 mt-[30px] bg-[#155dfd] py-2 rounded-[5px] text-white'>Add Manager</button>
                        </center>
                    </form>
                </main>
            </div>
        </div>
    )
}
