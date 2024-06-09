export function retrieveTable(key) {
    let table = localStorage.getItem(key);
    cache[key] = JSON.parse(table) || {};
    if (table == null) return {};
    return cache[key];
}

export function saveTable(key, table_optional) {
    if (table_optional != null) cache[key] = table_optional;
    localStorage.setItem(key, JSON.stringify(cache[key]));
}

export var cache = {}