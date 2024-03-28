interface Attribute {
    id: number,
    name: string,
}

interface Methode {
    id: number,
    name: string,
}

interface Klasse {
    name: string,
    attributes: Attribute[],
    methodes: Methode[],
}
