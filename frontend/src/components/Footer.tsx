

function Footer() {
    return (
        <>
            <footer className="w-full border-t mt-20">
                <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-blue-600">SearchAThon</h2>
                        <p className="text-slate-500 mt-2">
                            Find teammates. Build projects. Win hackathons.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">Quick Links</h3>
                        <ul className="mt-3 space-y-2 text-slate-500">
                            <li className="hover:text-slate-900 cursor-pointer">Home</li>
                            <li className="hover:text-slate-900 cursor-pointer">Explore Teams</li>
                            <li className="hover:text-slate-900 cursor-pointer">Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">Connect</h3>
                        <ul className="mt-3 space-y-2 text-slate-500">
                            <li className="hover:text-slate-900 cursor-pointer">GitHub</li>
                            <li className="hover:text-slate-900 cursor-pointer">LinkedIn</li>
                            <li className="hover:text-slate-900 cursor-pointer">Email</li>
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