export const singleTree = (data) => {
    let retData = [];
    retData.push({
        id: data.person.id,
        spouses: data.spouses,
        siblings: data.siblings,
        parents: data.parents,
        children: data.children
    });
    data.spouses.forEach((item) => {
        retData.push({
            id: item.id,
            spouses: [{ id: data.person.id }],
            siblings: [],
            parents: [],
            children: data.children
        });
    });
    data.siblings.forEach((item) => {
        retData.push({
            id: item.id,
            spouses: [],
            siblings: [{ id: data.person.id }],
            parents: data.parents,
            children: []
        });
    });
    data.parents.forEach((item) => {
        retData.push({
            id: item.id,
            spouses: [],
            siblings: [],
            parents: [],
            children: [{ id: data.person.id }, ...data.siblings]
        });
    });
    data.children.forEach((item) => {
        retData.push({
            id: item.id,
            spouses: [],
            siblings: [],
            parents: [{ id: data.person.id }, ...data.spouses],
            children: []
        });
    });
    console.log(retData);
    return retData;
};
