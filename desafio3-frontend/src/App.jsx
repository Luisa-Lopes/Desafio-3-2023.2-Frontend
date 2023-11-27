import { useState } from "react";
import "./App.css";
import Column from "./components/column";
import { handlePost } from "./utils/request";

const Data = [
    {
        title: "A fazer",
        url: "fazer",
        id: 1,
        border: false,
        primaryColor: "#846351",
        secondaryColor: "#887B6B",
    },
    {
        title: "Em andamento",
        url: "andamento",
        id: 2,
        border: true,
        primaryColor: "#46556C",
        secondaryColor: "#6B7E88",
    },
    {
        title: "Concluído",
        url: "concluido",
        id: 3,
        border: false,
        primaryColor: "#466C6C",
        secondaryColor: "#6B7E88",
    },
];

function App() {
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState({});
    const [upload, setUpload] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        handlePost("people", inputs);
        setInputs({});
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value); // Isso deve imprimir o valor do input no console
        if (name === "image") {
            setInputs((values) => ({ ...values, image: value }));
        } else {
            setInputs((values) => ({ ...values, [name]: value }));
        }
    };

    return (
        <div className="bg-[#3A3A3A] h-screen w-screen p-10 relative">
            <div className="absolute top-0 right-0 m-2 ">
                <button
                    onClick={() => setOpen(true)}
                    className="z-0 bg-[#42506466] px-2 rounded-md"
                >
                    Adicionar responsável
                </button>
                <form
                    className={`${
                        open ? "" : "hidden"
                    } bg-[#969696]  relative  w-[250px] p-4 max-w-[350px] rounded-md flex flex-col z-40`}
                    onSubmit={handleSubmit}
                >
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="absolute top-0 right-0"
                    >
                        <i className="bi bi-x"></i>
                    </button>
                    <input
                        type="url"
                        accept="image/*"
                        name="image"
                        className="text-black w-full my-1 rounded-md text-center"
                        value={inputs.image}
                        placeholder="Coloque um URL"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="name"
                        className="text-center capitalize bg-white w-full rounded-md my-1"
                        placeholder="Nome do responsável"
                        onChange={handleChange}
                        value={inputs.name}
                    />
                    <button
                        type="submit"
                        onClick={() => setUpload(true)}
                        className="text-center bg-[#42506466] w-24 m-auto rounded-md py-1"
                    >
                        Adicionar
                    </button>
                </form>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-3 border-[#969696] border-8 h-full rounded-md items-center py-2 px-4  overflow-auto">
                {Data.map((element) => (
                    <Column
                        key={element.id}
                        element={element}
                        upload={upload}
                        setUpload={setUpload}
                    />
                ))}
            </section>
        </div>
    );
}

export default App;
