import { useState, useRef } from "react";
import KlasseImage from "./components/KlasseImage";
import { toPng } from "html-to-image";
import { copyImageToClipboard } from "copy-image-clipboard";
import AttributesList from "./components/AttributesList";
import MethodesList from "./components/MethodesList";

function App() {
    const elementRef = useRef<HTMLDivElement | null>(null);

    const handleDownloadImage = () => {
        if (!elementRef.current) return;

        toPng(elementRef.current, { cacheBust: false })
            .then((dataUrl: string) => {
                const link = document.createElement("a");
                link.download = "my-image-name.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    const handleCopyImage = () => {
        if (!elementRef.current) return;

        toPng(elementRef.current, { cacheBust: false })
            .then((dataUrl: string) => {
                copyImageToClipboard(dataUrl);
            })
            .catch((err: any) => {
                console.log(err);
            });
    };

    const [klasse, setKlasse] = useState<Klasse>({ name: "", attributes: [], methodes: [] });
    const [isObject, setIsObject] = useState(false);

    const handleObjectChange = () => {
        if (!isObject) {
            document.documentElement.style.setProperty('--object-radius', '15px');
        } else {
            document.documentElement.style.setProperty('--object-radius', '0px');
        }
        setIsObject(!isObject);
    }

    const handleNameChange = (newName: string) => {
        setKlasse({ name: newName, attributes: klasse.attributes, methodes: klasse.methodes });
    }

    const handleAddAttributes = () => {
        setKlasse({ name: klasse.name, attributes: [...klasse.attributes, { id: Date.now(), name: "" }], methodes: klasse.methodes });
    }

    const handleAttributesChange = (id: number, attName: string) => {
        setKlasse({
            name: klasse.name, attributes: klasse.attributes.map(attribute => {
                if (attribute.id === id) { return { id: attribute.id, name: attName } }
                return attribute;
            }), methodes: klasse.methodes
        });
    }

    const handleAttributeDelete = (id: number) => {
        setKlasse({
            name: klasse.name, attributes: klasse.attributes.filter(attribute => attribute.id !== id), methodes: klasse.methodes
        });
    }

    const handleAddMethodes = () => {
        setKlasse({ name: klasse.name, attributes: klasse.attributes, methodes: [...klasse.methodes, { id: Date.now(), name: "" }] });
    }

    const handleMethodesChanges = (id: number, methName: string) => {
        setKlasse({
            name: klasse.name, attributes: klasse.attributes, methodes: klasse.methodes.map(method => {
                if (method.id === id) { return { id: method.id, name: methName } }
                return method;
            })
        });
    }

    const handleMethodDelete = (id: number) => {
        setKlasse({
            name: klasse.name, attributes: klasse.attributes, methodes: klasse.methodes.filter(method => method.id !== id)
        });
    }

    return (
        <>
            <span className="title">
                <a href="https://nichtbruno.github.io/">← go to my page</a>
                <div className="Ttitle">
                    <h4>KOEZ</h4>
                    <p> v.1.0.4</p>
                </div>
            </span>
            <div className="rest">
                <div className="middleRest">
                    <button id="copy-button" onClick={() => handleCopyImage()}>📋 Copy Image</button>
                    <button id="download-button" onClick={() => handleDownloadImage()}>💾 Download Image</button>
                </div>
                <input className="spec-input" placeholder="Name" value={klasse.name} onChange={e => { handleNameChange(e.target.value) }} />
                <KlasseImage isObject={isObject} handleObjectChange={handleObjectChange} cref={elementRef} klasse={klasse} />
                <div className="superpair">
                    <div className="middlepair">
                        <div className="pair">
                            <button onClick={handleAddAttributes}>+ Add Attribute</button>
                        </div>
                        <AttributesList attributes={klasse.attributes} onAttributeChange={handleAttributesChange} onAttributeDelete={handleAttributeDelete} />
                    </div>
                    {!isObject &&
                        <div className="middlepair">
                            <div className="pair">
                                <button onClick={handleAddMethodes}>+ Add Method</button>
                            </div>
                            <MethodesList methodes={klasse.methodes} onMethodeChange={handleMethodesChanges} onMethodeDelete={handleMethodDelete} />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default App;
