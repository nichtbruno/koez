interface ALProps {
    attributes: Attribute[],
    onAttributeChange: (id: number, attName: string) => void,
    onAttributeDelete: (id: number) => void,
}

function AttributesList({ attributes, onAttributeChange, onAttributeDelete }: ALProps) {
    return (
        <>
            <div className="input-list">
                {attributes.map(attribute =>
                    <div key={attribute.id}>
                        <input placeholder="example :/= type" value={attribute.name} onChange={e => { onAttributeChange(attribute.id, e.target.value) }} />
                        <button className="deleteButton" onClick={() => {onAttributeDelete(attribute.id)}}>X</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default AttributesList;
