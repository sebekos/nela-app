export const singleTree = (data) => {
    let retData = [];
    retData.push({
        id: data.person.id,
        first_name: data.person.first_name,
        last_name: data.person.last_name,
        link_photo: data.person.link_photo,
        birth_date: data.person.birth_date,
        spouses: data.spouses,
        siblings: data.siblings,
        parents: data.parents,
        children: data.children
    });
    data.spouses.forEach((item) => {
        retData.push({
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            link_photo: item.link_photo,
            birth_date: item.birth_date,
            spouses: [{ id: data.person.id }],
            siblings: [],
            parents: [],
            children: data.children
        });
    });
    data.siblings.forEach((item) => {
        retData.push({
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            link_photo: item.link_photo,
            birth_date: item.birth_date,
            spouses: [],
            siblings: [{ id: data.person.id }],
            parents: data.parents,
            children: []
        });
    });
    data.parents.forEach((item) => {
        retData.push({
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            link_photo: item.link_photo,
            birth_date: item.birth_date,
            spouses: [],
            siblings: [],
            parents: [],
            children: [{ id: data.person.id }, ...data.siblings]
        });
    });
    data.children.forEach((item) => {
        retData.push({
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            link_photo: item.link_photo,
            birth_date: item.birth_date,
            spouses: [],
            siblings: [],
            parents: [{ id: data.person.id }, ...data.spouses],
            children: []
        });
    });
    return retData;
};
