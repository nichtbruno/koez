import { MutableRefObject, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface KIProps {
    klasse: Klasse,
    cref?: MutableRefObject<HTMLDivElement | null>,
}

function KlasseImage({ klasse, cref }: KIProps) {
    const [currentColor, setCurrentColor] = useState("#5DADE2");
    const [isObject, setIsObject] = useState(false);

    const handleColorChange = (color: string) => {
        setCurrentColor(color);
    }

    const handleObjectChange = () => {
        if (!isObject) {
            document.documentElement.style.setProperty('--object-radius', '15px');
        } else {
            document.documentElement.style.setProperty('--object-radius', '0px');
        }
        setIsObject(!isObject);
    }

    const astyle = {
        background: currentColor,
    }

    return (
        <>
            <div className="diggas">
                <div ref={cref} className="app-container" style={astyle}>
                    <div className="app-header">{klasse.name ? klasse.name : "Name"}</div>
                    <div className="property-container">
                        {klasse.attributes.length !== 0 ? klasse.attributes.map(attribute =>
                            <div className="property-row" key={attribute.id}>
                                <div className="property-name">{attribute.name}</div>
                            </div>
                        ) :
                            <div className="property-row">
                                <div className="property-name">example :/= type</div>
                            </div>
                        }
                    </div>
                    {!isObject &&
                    <div className="method-container">
                        <div className="method-row">
                            {klasse.methodes.length !== 0 ? klasse.methodes.map(methode =>
                                <div className="method-name" key={methode.id}>{methode.name}</div>
                            ) :
                                <div className="method-name">method</div>
                            }
                        </div>
                    </div>}
                </div>
                <section className="small">
                    <HexColorPicker color={currentColor} onChange={handleColorChange} />
                </section>
            </div>
            <button className="objButton" onClick={handleObjectChange}>Change to {isObject ? "Class" : "Object"}</button>
        </>
    );
}

export default KlasseImage;
