"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterQuery(filters, genre) {
    var str = '';
    if (typeof filters !== 'undefined' && filters.length != 0)
        str = (" AND c.categorie IN " + JSON.stringify(filters)).replace(/"/g, "'");
    if (genre == 'men' || genre == 'women')
        str += " AND c.genre = \"" + genre + "\"";
    return str;
}
exports.default = filterQuery;
//# sourceMappingURL=filterQuery.js.map