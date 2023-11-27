import { useEffect, useState } from "react";
import fetchData from "../utils/fetchApi";
import { handlePost } from "../utils/request";
import PropTypes from "prop-types";

const CardCreator = (props) => {
    const { setClicked, clicked, upload, setUpload, url } = props;

    const [inputs, setInputs] = useState({});
    const [people, setPeople] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value); // Isso deve imprimir o valor do input no console

        if (name === "date") {
            const formattedValue = formatDateString(value);
            setInputs((values) => ({
                ...values,
                [name]: value,
                formattedDate: formattedValue,
            }));
        } else {
            setInputs((values) => ({ ...values, [name]: value }));
        }
    };
    const formatDateString = (date) => {
        const [year, month, day] = date.split("-");
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form submitted with inputs:", inputs);
        handlePost(url, inputs);
        setInputs({});
    };

    useEffect(() => {
        fetchData().then((results) => setPeople(results.People));
        setUpload(false);
    }, [upload]);

    useEffect(() => {
        if (inputs.name != "" && inputs.name != undefined) {
            console.log("entrou");
            const selectedPerson = people.find(
                (person) => person.name === inputs.name
            );
            if (selectedPerson != undefined) {
                setInputs((values) => ({
                    ...values,
                    image: selectedPerson.image,
                }));
            }
        }
    }, [people, inputs.name]);

    return (
        <form
            onSubmit={handleSubmit}
            className={`${
                clicked
                    ? "transition-opacity ease-in-out opacity-100 duration-[5000]"
                    : "hidden"
            }  bg-[#42506466] text-[#FFFFFF6B] rounded-sm p-1 opacity-0`}
        >
            <input
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                className="text-center capitalize border-b-2 bg-transparent w-full "
                placeholder="Título"
            />
            <div className="grid grid-cols-2  gap-2 py-1">
                <section className="grid grid-rows-2 w-full">
                    <div className="grid grid-cols-5 my-2">
                        {inputs.name !== "" && inputs.name !== undefined && (
                            <div>
                                {people.map((person) => {
                                    if (person.name === inputs.name) {
                                        return (
                                            <img
                                                key={person.id}
                                                src={person.image}
                                                alt={person.name}
                                                className="w-6"
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        )}
                        <input
                            list="people"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={inputs.name}
                            className="text-black w-full col-start-2 col-end-6"
                        />
                        <datalist id="people" className="text-black">
                            {people.map((item) => {
                                return (
                                    <option
                                        key={item.id}
                                        value={item.name}
                                        className="text-black"
                                    ></option>
                                );
                            })}
                        </datalist>
                    </div>
                    <div className="grid grid-cols-5 my-1 place-items-center">
                        <i className="bi bi-calendar3 text-[#FFFFFF] "></i>
                        <input
                            id="date"
                            type="date"
                            className="bg-transparent col-start-2 col-end-6 text-center"
                            name="date"
                            value={inputs.date || ""}
                            onChange={handleChange}
                        />
                    </div>
                </section>
                <div className="w-full border-l-2 px-2">
                    <textarea
                        className="w-full h-full bg-transparent outline-none text-center"
                        placeholder="Descrição"
                        name="description"
                        value={inputs.description || ""}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 ">
                <button type="reset" onClick={() => setClicked(false)}>
                    <i className="bi bi-x-lg text-[#FFFFFF]"></i>
                </button>
                <button
                    type="submit"
                    onClick={() => {
                        setClicked(false), setUpload(true);
                    }}
                >
                    <i className="bi bi-check-lg text-[#FFFFFF]"></i>
                </button>
            </div>
        </form>
    );
};

CardCreator.propTypes = {
    setClicked: PropTypes.bool,
    clicked: PropTypes.bool,
    upload: PropTypes.bool,
    setUpload: PropTypes.func,
    url: PropTypes.string,
};

export default CardCreator;
