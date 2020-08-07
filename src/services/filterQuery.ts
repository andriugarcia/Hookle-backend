function filterQuery(filters, genre) {
    let str = ''
    if (typeof filters !== 'undefined' && filters.length != 0)
        str = ` AND c.categorie IN ${JSON.stringify(filters)}`.replace(
            /"/g,
            "'"
        )
    if (genre == 'men' || genre == 'women') str += ` AND c.genre = "${genre}"`

    return str
}

export default filterQuery
