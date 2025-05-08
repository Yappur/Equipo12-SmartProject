import { Link } from "react-router-dom"

const DemoSection = () => {
    return (
        <section className="md-px-0 px-5">
            <div className="container bg-[#162C4D] py-12 mx-auto px-4 text-center rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-around">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">
                                <span>Talento</span>
                                <span className="text-orange-400">Match</span>
                            </h3>
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            Mejora el seguimiento en tus procesos de selección
                        </h2>
                    </div>
                    <div className="w-full md:w-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                className="bg-white form-control border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="exampleInput"
                                placeholder="Introduce tu email..."
                            />
                            <Link
                                href="#"
                                className="text-center w-full bg-orange-400 hover:bg-orange-500 text-white rounded-full px-6 py-2"
                            >
                                Pedir acceso
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DemoSection