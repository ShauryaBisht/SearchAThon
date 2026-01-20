
import { Link } from "react-router-dom"
function Footer() {
    return (
        <>
            <footer className="w-full border-t mt-20">
                <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-blue-600">SearchAThon</h2>
                        <p className="text-slate-500 mt-2 dark:text-slate-300">
                            Find teammates. Build projects. Win hackathons.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400">Quick Links</h3>
                        <ul className="mt-3 space-y-5 text-slate-500">
                            <Link to='/'><li className="hover:text-slate-900 cursor-pointer dark:text-slate-300  dark:hover:text-blue-400">Home</li></Link>
                            <Link to=''><li className="hover:text-slate-900 cursor-pointer dark:text-slate-300  dark:hover:text-blue-400">Explore Teams</li></Link>
                            <Link to=''><li className="hover:text-slate-900 cursor-pointer dark:text-slate-300  dark:hover:text-blue-400">Contact Us</li></Link>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400">Connect</h3>
                        <ul className="mt-3 space-y-2 text-slate-500">
                             <Link to=''><li className="hover:text-slate-900 cursor-pointer dark:text-slate-300  dark:hover:text-blue-400">GitHub</li></Link>
                            <Link to=''> <li className="hover:text-slate-900 cursor-pointer dark:text-slate-300  dark:hover:text-blue-400">LinkedIn</li></Link>
                             <Link to=''><li className="hover:text-slate-900 cursor-pointer dark:text-slate-300  dark:hover:text-blue-400">Email</li></Link>
                        </ul>
                    </div>
                </div>
                <div className="border-t">
                    <p className="text-center text-slate-500 py-4 text-sm">
                        © 2026 SearchAThon. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer