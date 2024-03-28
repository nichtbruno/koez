interface MLProps {
    methodes: Methode[],
    onMethodeChange: (id: number, methName: string) => void,
    onMethodeDelete: (id: number) => void,
}

function MethodesList({ methodes, onMethodeChange, onMethodeDelete }: MLProps) {
    return (
        <>
            <div className="input-list">
                {methodes.map(methode =>
                    <div key={methode.id}>
                        <input placeholder="method" value={methode.name} onChange={e => { onMethodeChange(methode.id, e.target.value) }} />
                        <button className="deleteButton" onClick={() => {onMethodeDelete(methode.id)}}>X</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default MethodesList;
