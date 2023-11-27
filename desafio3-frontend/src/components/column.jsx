import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import CardCreator from "./cardCreator";
import Card from "./card";

const Column = (props) => {
    const { element, upload, setUpload } = props;

    console.log(element);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {}, [clicked]);

    return (
        <div
            className={`h-full flex flex-col 
            ${element.border ? "md:border-x-4  md:border-[#969696] " : ""} `}
        >
            <h1
                className={`w-full p-6 capitalize text-[#FFFFFF] text-center text-2xl border-b-4 border-[#969696] `}
            >
                {element.title}
            </h1>

            <Card
                element={element}
                color={element.primaryColor}
                upload={upload}
                setUpload={setUpload}
                url={element.url}
            />

            <section className="p-2">
                <CardCreator
                    setClicked={setClicked}
                    clicked={clicked}
                    url={element.url}
                    upload={upload}
                    setUpload={setUpload}
                />
                <section>
                    <button
                        className={`${
                            clicked ? "hidden" : ""
                        }bg-[#42506466] rounded-md m-auto w-full`}
                        onClick={() => setClicked(true)}
                    >
                        <i
                            className={`${
                                clicked ? "hidden" : "bi bi-plus-lg"
                            } `}
                            onClick={() => setClicked(true)}
                        ></i>
                    </button>
                </section>
            </section>
        </div>
    );
};

Column.propTypes = {
    element: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        id: PropTypes.number,
        border: PropTypes.bool,
        primaryColor: PropTypes.number,
        secondaryColor: PropTypes.string,
    }),
    upload: PropTypes.bool,
    setUpload: PropTypes.bool,
};

export default Column;
