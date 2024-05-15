export const round2 = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

export const convertDocToObject = (doc: any) => {
    doc._id = doc._id.toString();
    return doc
}