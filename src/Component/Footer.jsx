import React from 'react'

const Footer = () => {
    return (

        <footer class="bg-white absolute bottom-6 w-11/12 rounded-lg shadow mx-10">
            <div class="mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span class="text-sm text-gray-500 sm:text-center ">© 2023 Muhammad Hammad Asghar. All Rights Reserved.
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                    <li className="mx-5">
                        <p>hammadasgharm@gmail.com</p>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">LinkedIn</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Github</a>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer
